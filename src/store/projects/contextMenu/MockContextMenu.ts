import { IContextMenu } from "./IContextMenu";

export const MockContextMenus: IContextMenu[] = Array(10)
  .fill(10)
  .map((menu, index) => {
    return {
      id: index,
      text: `${index} menu`,
      context: `${index} context`,
    };
  });
