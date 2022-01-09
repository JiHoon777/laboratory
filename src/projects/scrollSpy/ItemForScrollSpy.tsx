import React from "react";
import classNames from "classnames";

interface IItemForScrollSpyProps {
  index: number;
  setCurrentIndex: (currentIndex: number) => void;
  addToSpyItems: (
    index: number,
    ele: React.MutableRefObject<HTMLDivElement>
  ) => void;
}

export const ItemForScrollSpy: React.FC<IItemForScrollSpyProps> = (props) => {
  const { index, setCurrentIndex, addToSpyItems } = props;
  const itemRef = React.useRef<HTMLDivElement | null>(null);
  const SpyTrigger = React.useRef<HTMLDivElement | null>(null);

  const SpyObserver = new IntersectionObserver(
    async ([{ isIntersecting }]) => {
      if (isIntersecting) {
        setCurrentIndex(index);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  React.useEffect(() => {
    if (SpyTrigger.current) {
      SpyObserver.observe(SpyTrigger.current);

      return () => {
        SpyTrigger.current && SpyObserver.unobserve(SpyTrigger.current);
      };
    }
  }, [SpyTrigger.current]);

  React.useEffect(() => {
    if (!itemRef.current) {
      return;
    }

    addToSpyItems(index, itemRef as React.MutableRefObject<HTMLDivElement>);
  }, [itemRef.current]);

  return (
    <div
      ref={itemRef}
      className={classNames(
        "w-screen h-screen flex justify-center items-center relative"
      )}
      style={{ backgroundColor: "pink", borderBottom: "1px solid black" }}
    >
      <div>{index}</div>
      <div ref={SpyTrigger} className={"absolute bottom-0 left-0"} />
    </div>
  );
};
