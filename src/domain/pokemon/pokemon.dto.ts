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
