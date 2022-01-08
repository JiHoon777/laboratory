import React from "react";

export function useDebounce() {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleDebounce = (func: () => void, time: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTimeout(() => {
      func();
    }, time);
  };

  return {
    handleDebounce,
  };
}
