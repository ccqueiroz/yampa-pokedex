import { useIsMobile } from "@/app/hooks/useMobile.hook";
import type { Pokemon } from "@/domain/pokemon/pokemon.dto";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef } from "react";

export const useControllerVirtualize = ({
  columnsGrid,
  isFetching,
  hasNextPage,
  fetchNextPage,
  pokemonList,
}: {
  columnsGrid: number;
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  pokemonList: Array<Pokemon>;
}) => {
  const isMobile = useIsMobile();

  const parentRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(pokemonList.length / columnsGrid),
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 210 : 220),
    debug: true,
  });

  const setRowItems = useCallback(
    (index: number) => {
      return pokemonList.slice(
        index * columnsGrid,
        Math.min(pokemonList.length, (index + 1) * columnsGrid)
      );
    },
    [columnsGrid, pokemonList]
  );

  useEffect(() => {
    if (!observerRef.current || isFetching || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: parentRef.current,
        threshold: 1,
      }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef!.current) observer.unobserve(observerRef!.current);
    };
  }, [isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    rowVirtualizer.measure();
  }, [columnsGrid, isMobile, rowVirtualizer]);

  return {
    parentRef,
    observerRef,
    rowVirtualizer,
    setRowItems,
  };
};
