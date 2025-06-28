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

  private static getId(url: string) {
    let pokeId: number | null = null;
    const findId = url.match(PokemonEntitie.regexToGetId);

    if (!findId || !findId[1]) {
      throw new Error(`Invalid Pokémon URL: ${url}`);
    }

    pokeId = parseInt(findId[1], 10);

    return pokeId;
  }

  private static capitalizeFirstLetterByName(name: string) {
    let pokeName: string | null;

    if (typeof name !== "string" || name.length === 0) pokeName = "";

    pokeName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

    return pokeName;
  }

  public static create(props: PokemonEntitieProps) {
    const pokeId = PokemonEntitie.getId(props.url);
    const pokeName = PokemonEntitie.capitalizeFirstLetterByName(props.name);

    return new PokemonEntitie({
      ...props,
      name: pokeName,
      id: pokeId.toString(),
    });
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
