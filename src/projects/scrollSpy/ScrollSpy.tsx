import React from "react";
import { ItemForScrollSpy } from "./ItemForScrollSpy";
import { useDebounce } from "../../hooks/useDebounce";

interface IScrollSpyProps {}

export const ScrollSpy: React.FC<IScrollSpyProps> = (props) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { handleDebounce } = useDebounce();
  const list = Array(10).fill("");
  return (
    <div
      className={" overflow-y-auto"}
      ref={containerRef}
      onScroll={(e) => {
        if (containerRef.current) {
          handleDebounce(
            () => console.log(containerRef.current?.scrollTop),
            300
          );
        }
      }}
    >
      <div className={"fixed flex w-full"}>
        {list.map((_, index) => {
          return (
            <button key={index} className={"flex-1 bg-gray-100"}>
              {index}
            </button>
          );
        })}
      </div>
      {list.map((_, index) => {
        return <ItemForScrollSpy key={index} index={index} />;
      })}
    </div>
  );
};
