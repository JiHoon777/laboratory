import { action, makeObservable } from "mobx";
import { BaseProjectStore } from "../BaseProjectStore";
import { ProjectEnum } from "../projectEnum";
import { DOContextMenu } from "./DOContextMenu";
import { MockContextMenus } from "./MockContextMenu";

export class ContextMenuStore extends BaseProjectStore {
  contextMenus: DOContextMenu[];

  constructor() {
    super(ProjectEnum.ContextMenu, "ContextMenu 를 맛보자");
    this.contextMenus = MockContextMenus.map(
      (menu) => new DOContextMenu(menu.text, menu.context)
    );

    makeObservable(this, {
      closeContextInMenus: action,
    });
  }

  closeContextInMenus() {
    // showContext 가 true 인 것만 뽑아낸다.
    const menus = this.contextMenus.filter((menu) => menu.showContext);

    // menus 가 없다면 return
    if (!menus || menus.length === 0) {
      return;
    }

    menus.forEach((menu) => {
      menu.setShowContext(false);
    });
  }
}
