import { useRef, useCallback } from "react";

export const useDebounce = () => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = useCallback(
    (callback: () => void, delay = 300) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback();
      }, delay);
    },
    []
  );

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  return { debounce, cancel };
};
