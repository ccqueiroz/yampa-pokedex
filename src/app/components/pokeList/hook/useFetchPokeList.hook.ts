import { PokemonEntitie } from "@/domain/pokemon/pokemon.entitie";
import { httpInfra } from "@/infra/http/index.http.infra";
import { pokemonListStore } from "@/infra/store/pokemonList.store";
import { GetPokeListService } from "@/service/getPokeList.service";
import { GetPokeListUseCase } from "@/usecase/getPokeList.usecase";
import { useInfiniteQuery } from "@tanstack/react-query";

const getPokeListService = new GetPokeListService(httpInfra());
const getPokeListUseCase = new GetPokeListUseCase({
  service: getPokeListService,
  pokeEntitie: PokemonEntitie,
});

export const useFetchPokeList = () => {
  const { fetchNextPage, isFetching, hasNextPage, hasPreviousPage } =
    useInfiniteQuery({
      queryKey: ["pokemons"],
      initialPageParam: 0,
      queryFn: async ({ pageParam = 1, signal }) => {
        const pokemons = await getPokeListUseCase.execute({
          limit: 1400,
          offset: pageParam,
          signal,
        });
        pokemonListStore.setPokemons(pokemons.results);

        return pokemons;
      },
      getNextPageParam: (lastPage) => lastPage?.next?.offset ?? undefined,
      getPreviousPageParam: (previous) =>
        previous?.previous?.offset ?? undefined,
      staleTime: 20 * 60 * 1000,
    });

  return {
    fetchNextPage,
    isFetching,
    hasNextPage,
    hasPreviousPage,
  };
};
