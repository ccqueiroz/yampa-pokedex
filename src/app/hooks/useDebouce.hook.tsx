import { useRef, useCallback } from "react";

export const useDebounce = (callback: () => void, delay = 300) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  return { debounce, cancel };
};
