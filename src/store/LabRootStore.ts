import { computed, makeObservable } from "mobx";
import { ContextMenuStore } from "./projects/contextMenu/ContextMenuStore";

export class LabRootStore {
  contextMenuStore: ContextMenuStore;

  constructor() {
    this.contextMenuStore = new ContextMenuStore();
    makeObservable(this, {
      getProjects: computed,
    });
  }

  // 일단 수동으로 관리하고 추후 더 편하게 수정하자
  get getProjects() {
    return [
      {
        projectName: this.contextMenuStore.projectName,
        projectDesc: this.contextMenuStore.projectDesc,
      },
    ];
  }
}
