import { GetPokemonService } from "@/service/getPoke.service";
import { httpInfra } from "@/infra/http/index.http.infra";
import { GetPokemonUseCase } from "@/usecase/getPoke.usecase.usecase";
import { PokemonInfoDataEntitie } from "@/domain/pokemon/pokemonInfoData.entitie";
import { useQuery } from "@tanstack/react-query";
import type { ResponsePokemon } from "@/domain/pokemon/pokemon.dto";
import { useMemo } from "react";
import { TYPE_COLORS } from "@/infra/constants/TYPE_COLORS.constantes";

const getPokeService = new GetPokemonService(httpInfra());
const getPokeUseCase = new GetPokemonUseCase({
  service: getPokeService,
  pokemonInfoDataEntitie: PokemonInfoDataEntitie,
});

export const usePokeCardProvider = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery<ResponsePokemon | null, Error>({
    queryKey: ["pokemon", id],
    queryFn: ({ signal }) => getPokeUseCase.execute({ id, signal }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const bgCardPoke = useMemo(() => {
    if (!data?.types) return "";

    const from = TYPE_COLORS[data?.types[0]?.type] ?? "#ffffff";
    const to = TYPE_COLORS[data?.types[1]?.type] ?? from;
    return `linear-gradient(to bottom right, ${from}d9, ${to}a6)`;
  }, [data?.types]);

  return { isLoading, data, bgCardPoke };
};
