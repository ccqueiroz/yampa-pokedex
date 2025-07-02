/* eslint-disable react-hooks/exhaustive-deps */
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { PokeCard } from "../pokeCard/pokeCard.component";
import { usePokemonList } from "./hook/usePokeList.hook";
import { useIsMobile } from "@/app/hooks/useMobile.hook";
import { PokeCardProvider } from "../pokeCard/context/pokeCardProvider.component";
import { observer } from "mobx-react-lite";
import { pokemonListStore } from "@/infra/store/pokemonList.store";
import { EmptyPokemonList } from "./fragments/EmptyPokemonList/emptyPokemonList.component";
import { Loading } from "../loading/loading.component";
import { useAccordionStatusPokemon } from "@/app/context/useAccordionStatusPokemon.context";

export const PokeList = observer(() => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState(1);
  const { fetchNextPage, isFetching, hasNextPage } = usePokemonList();
  const { idCard } = useAccordionStatusPokemon();
  const isMobile = useIsMobile();

  const items = [...pokemonListStore.pokemonListToShow];

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(items.length / columns),
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 210 : 220),
    debug: true,
  });

  const controllStartPositionCard = useCallback(
    (rowStart: number, rowIndex: number) => {
      if (!idCard || columns > 1) return rowStart;

      const indexOfCard = items.findIndex(
        (item) => item.id === idCard.toString()
      );
      const rowOfCard = Math.floor(indexOfCard / columns);

      return rowIndex > rowOfCard ? rowStart + 130 : rowStart;
    },
    [columns, idCard, items]
  );

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
  }, [columns, isMobile, rowVirtualizer]);

  return (
    <>
      {isFetching && <Loading />}
      <div className="relative w-full">
        {rowVirtualizer.getVirtualItems().length >= 5 && (
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-black/10 to-transparent z-20 rounded-3xl" />
        )}
        <div
          ref={parentRef}
          style={{
            scrollBehavior: "smooth",
            minHeight: !rowVirtualizer.getVirtualItems().length
              ? "400px"
              : undefined,
          }}
          className="w-full h-[calc(100vh-150px)] md:h-[calc(100vh-92px)] overflow-auto mt-4 scroll-smooth overscroll-contain touch-auto"
          id="section-main"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {!!rowVirtualizer.getVirtualItems().length &&
              rowVirtualizer.getVirtualItems().map((row, i, all) => {
                const rowItems = items.slice(
                  row.index * columns,
                  Math.min(items.length, (row.index + 1) * columns)
                );

                if (rowItems.length === 0) return null;

                const missingColumns = columns - rowItems.length;

                const listWithMissingColumns = [
                  ...Array(missingColumns).keys(),
                ];

                const isLastRow = i === all.length - 1;

                return (
                  <div
                    key={row.key}
                    ref={isLastRow ? observerRef : undefined}
                    className="absolute flex gap-12 md:gap-5 left-1/2 -translate-x-1/2"
                    style={{
                      top: controllStartPositionCard(row.start, row.index),
                      height: row.size,
                    }}
                  >
                    {rowItems.map((item) => (
                      <PokeCardProvider
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        url={item.url}
                      >
                        <PokeCard />
                      </PokeCardProvider>
                    ))}
                    {listWithMissingColumns.map((_, i) => (
                      <div
                        key={`placeholder-${i}`}
                        className="w-[320px] md:w-[350px] h-full max-w-[350px] min-w-80 min-h-40 scale-95 md:scale-100"
                      ></div>
                    ))}
                  </div>
                );
              })}
            {!isFetching && !rowVirtualizer.getVirtualItems().length && (
              <EmptyPokemonList />
            )}
          </div>
        </div>
      </div>
    </>
  );
});
