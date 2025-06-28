import type {
  QueriesParamsToListPokemon,
  ResponseListPokemon,
} from "@/domain/pokemon/pokemon.dto";
import type { UseCase } from "./usecase";
import type { GetPokeListService } from "@/service/getPokeList.service";
import type { PokemonEntitie } from "@/domain/pokemon/pokemon.entitie";

type InputDTO = {
  limit: number;
  offset: number;
  signal?: AbortSignal | undefined;
};

export class GetPokeListUseCase
  implements UseCase<InputDTO, Promise<ResponseListPokemon>>
{
  private readonly service: GetPokeListService;
  private readonly pokeEntitie: typeof PokemonEntitie;
  constructor({
    service,
    pokeEntitie,
  }: {
    service: GetPokeListService;
    pokeEntitie: typeof PokemonEntitie;
  }) {
    this.service = service;
    this.pokeEntitie = pokeEntitie;
  }

  private getOffsetAndLimit(url: string | null) {
    if (!url) return null;

    const getOffsetAndLimit = url.match(/offset=(\d+)&limit=(\d+)/);

    if (!getOffsetAndLimit) return null;

    const offset = parseInt(getOffsetAndLimit[1], 10);
    const limit = parseInt(getOffsetAndLimit[2], 10);

    return { offset, limit } as QueriesParamsToListPokemon;
  }

  async execute(input: InputDTO): Promise<ResponseListPokemon> {
    const pokeList = await this.service.execute(input);

    const pokeListWithFormatedResults: ResponseListPokemon = {
      ...pokeList,
      next: this.getOffsetAndLimit(pokeList.next),
      previous: this.getOffsetAndLimit(pokeList.previous),
      results: [],
    };

    if (pokeList.results.length > 0) {
      pokeList.results.forEach((poke) => {
        const pokemon = this.pokeEntitie.create({
          url: poke.url,
          name: poke.name,
        });

        pokeListWithFormatedResults.results.push({
          id: pokemon.id,
          name: pokemon.name,
          url: pokemon.url,
        });
      });
    }

    return pokeListWithFormatedResults;
  }
}
