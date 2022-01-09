const delay = () => new Promise((resolve) => setTimeout(resolve, 300));

export interface IItemForInfinite {
  id: number;
  title: string;
  text: string;
}

export interface IListForInfinite<T> {
  list: T[];
  page: number;
  totalCount: number;
}

const mockListForInfinite: IItemForInfinite[] = Array(52)
  .fill("")
  .map((_, index) => ({
    id: index,
    title: `${index} title`,
    text: `${index} text`,
  }));

export const listForInfinite = async (
  page: number
): Promise<IListForInfinite<IItemForInfinite>> => {
  await delay();
  const list = mockListForInfinite;
  const totalCount = list.length;

  const PAGE_SIZE = 10;
  const startIndex = (Math.max(1, page) - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  return {
    list: list.slice(startIndex, endIndex),
    page,
    totalCount,
  };
};
