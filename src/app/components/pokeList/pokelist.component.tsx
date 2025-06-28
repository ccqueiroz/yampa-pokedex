import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { PokeCard } from "../pokeCard/pokeCard.component";
import { usePokemonList } from "./hook/usePokeList.hook";
import { useIsMobile } from "@/app/hooks/useMobile.hook";

export const PokeList = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState(1);
  const { data, fetchNextPage, isFetching, hasNextPage } = usePokemonList();
  const isMobile = useIsMobile();

  const items = data?.pages.flatMap((page) => page.results) ?? [];
  const totalPokes = data?.pages[0].count ?? 0;

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(totalPokes / columns),
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 200 : 220),
    debug: true,
  });

  useLayoutEffect(() => {
    const resize = () => {
      const width = document.getElementById("section-main")?.offsetWidth ?? 0;
      if (width <= 500) setColumns(1);
      else if (width <= 1100) setColumns(2);
      else if (width <= 1500) setColumns(3);
      else setColumns(Math.floor(width / 350));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const last = rowVirtualizer.getVirtualItems().at(-1);
    const total = Math.ceil(items.length / columns);

    if (last && last.index >= total - 1 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [
    items.length,
    columns,
    hasNextPage,
    isFetching,
    fetchNextPage,
    rowVirtualizer,
  ]);

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
        threshold: 1.0,
      }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef!.current) observer.unobserve(observerRef!.current);
    };
  }, [isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    rowVirtualizer.measure();
  }, [columns, isMobile, rowVirtualizer]);

  return (
    <div
      ref={parentRef}
      className="w-full h-[100vh] lg:h-[92vh] overflow-auto mt-4"
      id="section-main"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((row, i, all) => {
          const rowItems = items.slice(
            row.index * columns,
            Math.min(items.length, (row.index + 1) * columns)
          );

          if (rowItems.length === 0) return null;

          const isLastRow = i === all.length - 1;

          return (
            <div
              key={row.key}
              ref={isLastRow ? observerRef : undefined}
              className="absolute flex gap-5 left-1/2 -translate-x-1/2"
              style={{
                top: row.start,
                height: row.size,
              }}
            >
              {rowItems.map((item) => (
                <PokeCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  url={item.url}
                  bg={"bg-gradient-to-br from-[#735797]/85 to-[#B6A136]/65"}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
