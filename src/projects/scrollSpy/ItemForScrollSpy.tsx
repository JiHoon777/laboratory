import React from "react";
import classNames from "classnames";

interface IItemForScrollSpyProps {
  index: number;
}

export const ItemForScrollSpy: React.FC<IItemForScrollSpyProps> = (props) => {
  const { index } = props;
  return (
    <div
      className={classNames(
        "w-screen h-screen flex justify-center items-center"
      )}
      style={{ backgroundColor: "pink", borderBottom: "1px solid black" }}
    >
      <div>{index}</div>
    </div>
  );
};
