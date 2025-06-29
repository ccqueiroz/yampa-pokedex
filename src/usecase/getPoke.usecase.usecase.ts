import type {
  ResponsePokemon,
  TypesPokemon,
} from "@/domain/pokemon/pokemon.dto";
import type { UseCase } from "./usecase";
import type { GetPokemonService } from "@/service/getPoke.service";
import type { PokemonInfoDataEntitie } from "@/domain/pokemon/pokemonInfoData.entitie";
import { TYPE_COLORS } from "@/infra/constants/TYPE_COLORS.constantes";

type InputDTO = {
  name?: string;
  id?: string;
  signal?: AbortSignal | undefined;
};

export class GetPokemonUseCase
  implements UseCase<InputDTO, Promise<ResponsePokemon | null>>
{
  private readonly service: GetPokemonService;
  private readonly pokemonInfoDataEntitie: typeof PokemonInfoDataEntitie;

  constructor({
    service,
    pokemonInfoDataEntitie,
  }: {
    service: GetPokemonService;
    pokemonInfoDataEntitie: typeof PokemonInfoDataEntitie;
  }) {
    this.service = service;
    this.pokemonInfoDataEntitie = pokemonInfoDataEntitie;
  }

  private getTypesFormated(
    types: Array<{
      type: string;
    }>
  ): TypesPokemon {
    return types.map(({ type }) => ({
      color: TYPE_COLORS[type],
      type: type,
    }));
  }

  async execute({
    id,
    name,
    signal,
  }: InputDTO): Promise<ResponsePokemon | null> {
    const poke = await this.service.execute({
      id,
      name,
      signal,
    });

    if (!poke) return null;

    const pokeFormated = this.pokemonInfoDataEntitie.create(poke);

    const typesFormated = this.getTypesFormated(pokeFormated.types);

    return {
      id: pokeFormated.id,
      name: pokeFormated.name,
      nameFormated: pokeFormated.nameFormated,
      abilities: pokeFormated.abilities,
      types: typesFormated,
      weight: pokeFormated.weight,
      height: pokeFormated.height,
      statusPokemon: pokeFormated.statusPokemon,
    };
  }
}
