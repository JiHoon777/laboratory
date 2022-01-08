import React from "react";
import { IListForInfinite } from "../projects/infiniteScroll/InifiniteScrollMock";

export function useInfiniteScroll<T>(
  func: (page: number) => Promise<IListForInfinite<T>>
) {
  const [loading, setLoading] = React.useState(0);
  const [list, setList] = React.useState<T[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const fetchMoreTrigger = React.useRef<HTMLDivElement | null>(null);

  const fetchMoreObserver = new IntersectionObserver(
    async ([{ isIntersecting }]) => {
      if (isIntersecting) {
        setPage((p) => p + 1);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  React.useEffect(() => {
    if (fetchMoreTrigger.current) {
      fetchMoreObserver.observe(fetchMoreTrigger.current);

      return () => {
        fetchMoreTrigger.current &&
          fetchMoreObserver.unobserve(fetchMoreTrigger.current);
      };
    }
  }, [fetchMoreTrigger.current]);

  const getList = async (page: number) => {
    if (!hasMore) {
      return;
    }

    setLoading((p) => p + 1);
    try {
      const res = await func(page);
      if (page === 1) {
        setList((p) => {
          return [...res.list];
        });
      } else {
        setList((p) => [...p, ...res.list]);
      }
      setHasMore(page < Math.ceil(res.totalCount / 10) ? true : false);
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading((p) => p - 1);
    }
  };

  React.useEffect(() => {
    getList(page).catch((ex) => {});
  }, [page]);

  return {
    fetchMoreTrigger,
    loading,
    list,
    hasMore,
  };
}
