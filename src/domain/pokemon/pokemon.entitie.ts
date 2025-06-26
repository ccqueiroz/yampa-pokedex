import type { Pokemon } from "./pokemon.dto";

export interface PokemonEntitieProps {
  name: string;
  url: string;
}

export class PokemonEntitie {
  private readonly nameProps: string;
  private readonly urlProps: string;
  private readonly idProps: string;

  private static readonly regexToGetId = /\/pokemon\/(\d+)\//;

  private constructor({ name, url, id }: Pokemon) {
    this.nameProps = name;
    this.urlProps = url;
    this.idProps = id;
  }

  public static create(props: PokemonEntitieProps) {
    let pokeId: number | null = null;
    const findId = props.url.match(PokemonEntitie.regexToGetId);

    if (!findId || !findId[1]) {
      throw new Error(`Invalid Pokémon URL: ${props.url}`);
    }

    pokeId = parseInt(findId[1], 10);

    return new PokemonEntitie({ ...props, id: pokeId.toString() });
  }

  public get id() {
    return this.idProps;
  }

  public get name() {
    return this.nameProps;
  }

  public get url() {
    return this.urlProps;
  }
}
