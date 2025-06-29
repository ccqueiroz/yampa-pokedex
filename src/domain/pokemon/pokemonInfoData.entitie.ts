import type {
  AbilitiesBase,
  AbilitiesPokemon,
  ResponsePokemon,
  ResponsePokemonService,
  StatsBase,
  StatusPokemon,
  TypeBase,
} from "./pokemon.dto";

export type PokemonInfoDataEntitieProps = Omit<ResponsePokemon, "types"> & {
  types: Array<{
    type: string;
  }>;
};

export class PokemonInfoDataEntitie {
  private readonly nameProps: string;
  private readonly nameFormatedProps: string;
  private readonly idProps: number;
  private readonly heightProps: number;
  private readonly weightProps: number;
  private readonly statusPokemonProps: StatusPokemon;
  private readonly typesProps: Array<{
    type: string;
  }>;
  private readonly abilitiesProps: AbilitiesPokemon;

  private constructor(props: PokemonInfoDataEntitieProps) {
    this.idProps = props.id;
    this.nameProps = props.name;
    this.nameFormatedProps = props.nameFormated;
    this.weightProps = props.weight;
    this.abilitiesProps = props.abilities;
    this.typesProps = props.types;
    this.statusPokemonProps = props.statusPokemon;
    this.heightProps = props.height;
  }

  private static builderStatusPokemon(stats: Array<StatsBase>): StatusPokemon {
    const statusMap: Required<Partial<StatusPokemon>> = {
      hp: 0,
      attack: 0,
      defense: 0,
      "special-attack": 0,
      "special-defense": 0,
      speed: 0,
      total: 0,
    };

    let total = 0;

    for (const stat of stats) {
      const key = stat.stat.name as keyof StatusPokemon;

      if (statusMap[key] !== undefined) {
        const valueStats = (statusMap[key] ?? 0) + stat.base_stat;
        statusMap[key] = valueStats;
        total += valueStats;
      }
    }
    statusMap.total = total;
    return statusMap;
  }

  private static builderTypesPokemon(types: Array<TypeBase>) {
    return types.map((t) => ({ type: t.type.name }));
  }

  private static builderAbilitiesPokemon(
    abilities: Array<AbilitiesBase>
  ): AbilitiesPokemon {
    return abilities.map((ability) => ({
      slot: ability.slot,
      ability: ability.ability.name,
    }));
  }

  private static capitalizeFirstLetterByName(name: string) {
    let pokeName: string | null;

    if (typeof name !== "string" || name.length === 0) pokeName = "";

    pokeName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

    return pokeName;
  }

  public static create(props: ResponsePokemonService) {
    const pokeNameFormated = PokemonInfoDataEntitie.capitalizeFirstLetterByName(
      props.name
    );
    const abilities = PokemonInfoDataEntitie.builderAbilitiesPokemon(
      props.abilities
    );
    const types = PokemonInfoDataEntitie.builderTypesPokemon(props.types);
    const status = PokemonInfoDataEntitie.builderStatusPokemon(props.stats);

    return new PokemonInfoDataEntitie({
      id: props.id,
      name: props.name,
      nameFormated: pokeNameFormated,
      abilities,
      types,
      height: props.height,
      weight: props.weight,
      statusPokemon: status,
    });
  }

  public get id() {
    return this.idProps;
  }

  public get name() {
    return this.nameProps;
  }

  public get nameFormated() {
    return this.nameFormatedProps;
  }

  public get abilities() {
    return this.abilitiesProps;
  }

  public get types() {
    return this.typesProps;
  }

  public get weight() {
    return this.weightProps;
  }

  public get height() {
    return this.heightProps;
  }

  public get statusPokemon() {
    return this.statusPokemonProps;
  }
}
