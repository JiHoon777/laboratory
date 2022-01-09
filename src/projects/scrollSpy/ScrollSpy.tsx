import React from "react";
import { ItemForScrollSpy } from "./ItemForScrollSpy";
import { useDebounce } from "../../hooks/useDebounce";
import classNames from "classnames";

interface IScrollSpyProps {}

export const ScrollSpy: React.FC<IScrollSpyProps> = (props) => {
  // scroll container ref
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // 영역별 ref 를 저장하기 위한 ref
  const spyItems = React.useRef<{
    [key: number]: React.MutableRefObject<HTMLDivElement>;
  }>({});

  // 현재 보고 있는 영역의 index
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) {
      return;
    }

    const top = spyItems.current[index]?.current.offsetTop ?? 0;
    containerRef.current.scrollTo({ behavior: "smooth", top });
  };

  const addToSpyItems = (
    index: number,
    ele: React.MutableRefObject<HTMLDivElement>
  ) => {
    spyItems.current[index] = ele;
  };

  const list = Array(10).fill("");
  return (
    <>
      <div className={"flex w-full"}>
        {list.map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={classNames("flex-1 bg-gray-100", {
                "bg-gray-500": currentIndex === index,
              })}
            >
              {index}
            </button>
          );
        })}
      </div>
      <div
        className={"overflow-y-auto"}
        ref={containerRef}
        onScroll={(e) => {
          // if (containerRef.current) {
          //   handleDebounce(
          //     () => console.log(containerRef.current?.scrollTop),
          //     300
          //   );
          // }
        }}
      >
        {list.map((_, index) => {
          return (
            <ItemForScrollSpy
              key={index}
              index={index}
              setCurrentIndex={setCurrentIndex}
              addToSpyItems={addToSpyItems}
            />
          );
        })}
      </div>
    </>
  );
};
