import React from "react";
import { listForInfinite } from "./InifiniteScrollMock";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

interface IInfiniteScrollProps {}

export const InfiniteScroll: React.FC<IInfiniteScrollProps> = (props) => {
  const { fetchMoreTrigger, loading, list, hasMore } =
    useInfiniteScroll(listForInfinite);

  return (
    <div className={"w-full h-full"}>
      {list.map((item) => {
        return (
          <div
            key={item.id}
            className="w-screen relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
            style={{ maxWidth: 500 }}
          >
            <div className="relative flex justify-between mt-1">
              <p className="line-clamp-2 text-sm text-gray-600">{item.title}</p>
              <p className="line-clamp-2 text-sm text-gray-600">{item.text}</p>
            </div>
          </div>
        );
      })}
      {hasMore && <div ref={fetchMoreTrigger}>...load More</div>}
    </div>
  );
};
