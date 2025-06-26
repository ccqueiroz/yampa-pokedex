export type Pokemon = {
  id: string;
  name: string;
  url: string;
};

export type ListPokemon = Array<Pokemon>;

export type ResponseListPokemon = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ListPokemon;
};
