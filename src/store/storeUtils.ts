export const debounce = (func: () => void, delay: number) => {
  let timeout: NodeJS.Timeout | null = null;

  timeout = setTimeout(() => {}, delay);
};
