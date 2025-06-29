import { PokemonEntitie } from "@/domain/pokemon/pokemon.entitie";
import { httpInfra } from "@/infra/http/index.http.infra";
import { GetPokeListService } from "@/service/getPokeList.service";
import { GetPokeListUseCase } from "@/usecase/getPokeList.usecase";
import { useInfiniteQuery } from "@tanstack/react-query";

const getPokeListService = new GetPokeListService(httpInfra());
const getPokeListUseCase = new GetPokeListUseCase({
  service: getPokeListService,
  pokeEntitie: PokemonEntitie,
});

export const usePokemonList = () => {
  const { data, fetchNextPage, isFetching, hasNextPage, hasPreviousPage } =
    useInfiniteQuery({
      queryKey: ["pokemons"],
      initialPageParam: 0,
      queryFn: async ({ pageParam = 0, signal }) =>
        getPokeListUseCase.execute({ limit: 12, offset: pageParam, signal }),
      getNextPageParam: (lastPage) => lastPage?.next?.offset ?? undefined,
      getPreviousPageParam: (previous) =>
        previous?.previous?.offset ?? undefined,
      staleTime: 5 * 60 * 1000,
      experimental_prefetchInRender: true,
    });

  return {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    hasPreviousPage,
  };
};
