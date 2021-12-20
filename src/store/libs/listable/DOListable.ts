import { IDOBase, IGQLObject } from "../../interfaces/model/IDOBase";
import {
  IDOListable,
  IDOPageListableDataLoader,
  IDOPageListableOptions,
} from "./IDOListable";
import { action, makeObservable, observable, runInAction } from "mobx";

export interface IDOListableCtorOptions {
  verbose?: boolean;

  name?: string;
}

export class DOListable<
  DATA extends IGQLObject,
  ID_TYPE extends string | number,
  SEARCH_OPTIONS extends IDOPageListableOptions
> implements IDOListable<DATA, ID_TYPE, SEARCH_OPTIONS>
{
  // 현재 목록의 데이터
  list: Array<IDOBase<DATA, ID_TYPE>> = [];
  totalCount: number = 0;

  // 리스트 데이터가 한 번이라도 로드되었나?
  isLoaded: boolean = false;

  // 로딩 중인가?
  isLoading: boolean = false;

  nextPageToLoad: number = 1;

  // 잠재적으로 아이템이 더 로드될 가능성이 있는가?
  hasMore: boolean = true;

  dataLoader: IDOPageListableDataLoader<DATA, ID_TYPE, SEARCH_OPTIONS>;
  itemKey: keyof DATA & string;
  searchOptions: SEARCH_OPTIONS;

  error: string | null = null;

  // cancel 을 처리하기 위한 변수
  currentRequestSeq: number = 0;

  log: (message: string) => void;

  constructor(
    dataLoader: IDOPageListableDataLoader<DATA, ID_TYPE, SEARCH_OPTIONS>,
    itemKey: keyof DATA & string,
    searchOptions: SEARCH_OPTIONS,
    options: IDOListableCtorOptions = {}
  ) {
    this.dataLoader = dataLoader;
    this.itemKey = itemKey;
    this.searchOptions = searchOptions;

    this.log = options.verbose
      ? (msg) =>
          console.log(`${options.name ? `[${options.name}]` : ""} ${msg}`)
      : () => null;

    makeObservable(this, {
      list: observable,
      totalCount: observable,
      isLoaded: observable,
      isLoading: observable,
      hasMore: observable,

      setPageSize: action,

      loadMore: action,
      reload: action,
      clear: action,
    });
  }

  setPageSize(pageSize: number) {
    this.log(`setPageSize = ${pageSize}`);
    this.searchOptions.pageSize = pageSize;
  }

  async loadMore() {
    this.log(`+ loadMore() in`);

    // 로딩중이거나 hasMore 이 false 일 때
    if (this.isLoading || !this.hasMore) {
      this.log(
        `- loadMore() out, isLoading = ${this.isLoading}, hasMore = ${this.hasMore}`
      );
      return;
    }
    this.isLoading = true;
    const requestSeq = this.currentRequestSeq;

    try {
      const pageToLoad = this.nextPageToLoad; // Load 할 Page
      const pageSize = this.searchOptions.pageSize; // 몇 개의 Data 를 받아올 것인지
      this.log(
        `+ loading page ${pageToLoad} with pageSize ${pageSize}, options = ${JSON.stringify(
          this.searchOptions
        )}`
      );
      const res = await this.dataLoader.loadPage(
        pageToLoad,
        this.searchOptions
      );

      if (this.currentRequestSeq !== requestSeq) {
        this.log(`sequence does not match. returning.`);
        return;
      }

      res
        .onSuccess((s) => {
          this.log(
            `- loading page ${pageToLoad} with pageSize ${pageSize}, loaded items len = ${s.list.length}`
          );

          // reload 등에서 1페이지 로드시에는 기존 리스트를 삭제
          if (pageToLoad === 1) {
            this.log(`resetting list because it is first page.`);
            runInAction(() => {
              this.list = [];
              this.totalCount = s.totalCount ?? 0;
            });
          }

          // 혹시라도 중복이 올 경우 대비
          const itemsToMerge = s.list.filter((v) => {
            const id = v.id;
            return !this.list.find((existing) => {
              return existing.id === id;
            });
          });

          this.log(`newly found items : ${itemsToMerge.length}, calling merge`);
          this.log(`newly found items : ${itemsToMerge.length}, merge out`);

          runInAction(() => {
            this.list = this.list.concat(itemsToMerge);
            this.totalCount = s.totalCount ?? 0;
            this.isLoaded = true;
            this.hasMore = s.list.length >= pageSize;
            this.nextPageToLoad += 1;
            this.error = null;
          });
        })
        .or((ex) => {
          this.log(`list response : ${ex}`);
        });
    } catch (error: any) {
      this.log(`Error!! : ${error.message}\n${error.stack}`);
      console.error(`Unhandled listable error`, error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    this.log(`- loadMore() out`);
  }

  reload(newOptions?: SEARCH_OPTIONS) {
    this.log(
      `reloading with new options = ${
        newOptions ? JSON.stringify(newOptions) : `no options.`
      }`
    );
    this.clear();

    if (newOptions) {
      this.searchOptions = newOptions;
    }

    return this.loadMore();
  }

  addItem(item: IDOBase<DATA, ID_TYPE>, positionIsTop: boolean) {
    const exists = this.list.find((i) => i.id === item.id);
    if (exists) {
      return;
    }

    runInAction(() => {
      if (positionIsTop) {
        this.list.unshift(item);
      } else {
        this.list.push(item);
      }
    });
  }

  removeItemBy(findFunc: (item: IDOBase<DATA, ID_TYPE>) => boolean) {
    const index = this.list.findIndex(findFunc);
    if (index >= 0) {
      runInAction(() => {
        this.list.splice(index, 1);
      });
    }
  }

  removeItem(itemId: KeyType) {
    // @ts-ignore
    const index = this.list.findIndex((i) => i[this.itemKey] === itemId);

    if (index >= 0) {
      this.list.splice(index, 1);
    }
  }

  clear() {
    this.currentRequestSeq += 1;
    this.isLoading = false;
    this.isLoaded = false;
    this.nextPageToLoad = 1;
    this.hasMore = true;

    runInAction(() => {
      this.list.splice(0);
    });
  }
}
