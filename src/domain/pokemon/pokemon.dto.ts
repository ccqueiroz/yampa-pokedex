export type Pokemon = {
  id: string;
  name: string;
  url: string;
};

export type ListPokemon = Array<Pokemon>;

export type QueriesParamsToListPokemon = {
  offset: number | null;
  limit: number | null;
};

export type ResponseListPokemon = {
  count: number;
  next: QueriesParamsToListPokemon | null;
  previous: QueriesParamsToListPokemon | null;
  results: ListPokemon;
};

export type TypesPokemon = Array<{ color: string; type: string }>;

export type AbilitiesPokemon = Array<{ slot: number; ability: string }>;

export type StatusPokemon = {
  hp: number;
  attack: number;
  defense: number;
  "special-attack": number;
  "special-defense": number;
  speed: number;
  total: number;
};

export type AbilitiesBase = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type StatsBase = {
  base_stat: number;
  stat: { name: string };
};

export type TypeBase = {
  type: { name: string };
};

export type ResponsePokemonService = {
  abilities: Array<AbilitiesBase>;
  base_experience: number;
  height: number;
  id: number;
  name: string;
  stats: Array<StatsBase>;
  types: Array<TypeBase>;
  weight: number;
};

export type ResponsePokemon = {
  statusPokemon: StatusPokemon;
  types: TypesPokemon;
  name: string;
  nameFormated: string;
  weight: number;
  height: number;
  id: number;
  abilities: AbilitiesPokemon;
};
