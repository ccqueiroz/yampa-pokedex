import { PokeCardProvider } from "../pokeCard/context/pokeCardProvider.component";
import { observer } from "mobx-react-lite";
import { pokemonListStore } from "@/infra/store/pokemonList.store";
import { Loading } from "../loading/loading.component";
import { useControllerVirtualize } from "./hook/useControllerVirtualizeList.hook";
import { usePokeList } from "./hook/usePokeList.hook";
import { lazy } from "react";

const EmptyPokemonList = lazy(() =>
  import("./fragments/EmptyPokemonList/emptyPokemonList.component").then(
    (module) => ({
      default: module.EmptyPokemonList,
    })
  )
);

const PokeCard = lazy(() =>
  import("../pokeCard/pokeCard.component").then((module) => ({
    default: module.PokeCard,
  }))
);

export const PokeList = observer(() => {
  const items = [...pokemonListStore.pokemonListToShow];

  const {
    columnsGrid,
    controllStartPositionCard,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = usePokeList();

  const { parentRef, observerRef, rowVirtualizer, setRowItems } =
    useControllerVirtualize({
      columnsGrid,
      isFetching,
      hasNextPage,
      fetchNextPage,
      pokemonList: items,
    });

  return (
    <>
      {isFetching && <Loading />}

      <div className="relative w-full" aria-live="polite">
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
            role="list"
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {!!rowVirtualizer.getVirtualItems().length &&
              rowVirtualizer.getVirtualItems().map((row, i, all) => {
                const rowItems = setRowItems(row.index);

                if (rowItems.length === 0) return null;

                const missingColumns = columnsGrid - rowItems.length;

                const listWithMissingColumns = [
                  ...Array(missingColumns).keys(),
                ];

                const isLastRow = i === all.length - 1;

                return (
                  <div
                    role="listitem"
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
