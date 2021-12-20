import { IDOBase, IGQLObject } from "../../interfaces/model/IDOBase";
import { ServerResponse } from "../apiServer/ServerResponse";

export interface IDOPageListableOptions {
  pageSize: number;
}

export interface IPageListable<T> {
  list: T[];
  totalCount: number;
}

export interface IDOPageListableDataLoader<
  DATA extends IGQLObject,
  ID_TYPE extends string | number,
  SEARCH_OPTIONS extends IDOPageListableOptions
> {
  loadPage(
    page: number,
    options: SEARCH_OPTIONS
  ): Promise<ServerResponse<IPageListable<IDOBase<DATA, ID_TYPE>>>>;
}

export interface IDOListable<
  DATA extends IGQLObject,
  ID_TYPE extends string | number,
  SEARCH_OPTIONS extends IDOPageListableOptions
> {
  list: Array<IDOBase<DATA, ID_TYPE>>;
  totalCount: number;
  isLoaded: boolean;
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;

  setPageSize: (pageSize: number) => void;

  loadMore(): Promise<void>;

  reload(newOptions?: SEARCH_OPTIONS): Promise<void>;

  addItem(item: IDOBase<DATA, ID_TYPE>, positionIsTop: boolean): void;

  removeItemBy(findFunc: (item: IDOBase<DATA, ID_TYPE>) => boolean): void;

  removeItem(itemId: KeyType): void;

  clear(): void;
}
