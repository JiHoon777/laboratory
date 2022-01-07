import React from "react";
import { observer } from "mobx-react";
import { useLabStore } from "../../store/configureRootStore";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import { DOContextMenu } from "../../store/projects/contextMenu/DOContextMenu";

interface IContextMenuProps {}

export const ContextMenu: React.FC<IContextMenuProps> = observer((props) => {
  const store = useLabStore();
  const cmStore = store.contextMenuStore;

  const contextMenuList = cmStore.contextMenus;
  return (
    <div className={"flex flex-col flex-1 px-10 items-center"}>
      <ul role="list" className="divide-y divide-gray-200">
        {contextMenuList.map((menu, index) => (
          <ContextMenuItem key={index} menu={menu} />
        ))}
      </ul>
    </div>
  );
});

interface IContextMenuItemProps {
  menu: DOContextMenu;
}

const ContextMenuItem: React.FC<IContextMenuItemProps> = observer((props) => {
  const { menu } = props;
  const contextWrapperRef = React.useRef<HTMLDivElement | null>(null);

  useDetectOutsideClick(
    () => menu.setShowContext(false),
    contextWrapperRef,
    menu.showContext
  );

  return (
    <li
      className="w-screen relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
      style={{ maxWidth: 500 }}
      onMouseEnter={() => {
        menu.setShowToggleContextButton(true);
      }}
      onMouseLeave={() => {
        menu.setShowToggleContextButton(false);
      }}
    >
      <div
        className="relative flex justify-between mt-1"
        ref={contextWrapperRef}
      >
        <p className="line-clamp-2 text-sm text-gray-600">{menu.text}</p>
        {menu.showToggleContextButton && (
          <button
            onClick={() =>
              menu.showContext
                ? menu.setShowContext(false)
                : menu.setShowContext(true)
            }
          >
            {menu.showContext ? "close" : "open"}
          </button>
        )}
        {menu.showContext && (
          <div
            className={"absolute "}
            style={{
              bottom: -40,
              right: 0,
              zIndex: 100,
              border: "1px solid black",
            }}
          >
            {menu.context}
          </div>
        )}
      </div>
    </li>
  );
});
