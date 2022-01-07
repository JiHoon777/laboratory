import { makeObservable } from "mobx";
import { BaseProjectStore } from "../BaseProjectStore";
import { ProjectEnum } from "../projectEnum";

export class ContextMenuStore extends BaseProjectStore {
  constructor() {
    super(ProjectEnum.ContextMenu, "ContextMenu 를 맛보자");
    makeObservable(this, {});
  }
}
