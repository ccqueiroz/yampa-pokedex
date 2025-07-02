import type {
  ListPokemon,
  Pokemon,
  PokemonName,
} from "@/domain/pokemon/pokemon.dto";
import { searchByPrefix } from "@/lib/searchByPrefix";
import { makeAutoObservable } from "mobx";

export class PokemonListStore {
  isLoading = false;
  pokemonsList = new Map<string, Pokemon>();
  private pokemonsNames: Array<PokemonName> = [];
  pokemonsSearchSuggestion: Array<PokemonName> = [];
  pokemonListToShow: Array<Pokemon> = [];
  totalPokemons = 0;

  constructor() {
    makeAutoObservable(this);
    this.setPokemons = this.setPokemons.bind(this);
    this.setSuggestions = this.setSuggestions.bind(this);
    this.getBySuggestedPokemons = this.getBySuggestedPokemons.bind(this);
    this.getOriginalListPokemons = this.getOriginalListPokemons.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
    this.reset = this.reset.bind(this);
  }

  setPokemons(pokemons: ListPokemon) {
    this.pokemonListToShow = pokemons;

    this.totalPokemons = pokemons.length;

    pokemons.forEach((pokemon) => {
      this.pokemonsList.set(pokemon.name.toLocaleLowerCase(), pokemon);
      this.pokemonsNames.push({ id: pokemon.id, name: pokemon.name });
    });

    this.pokemonsNames.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
  }

  setSuggestions(suggestion: string) {
    const resultsSuggestions = searchByPrefix(suggestion, this.pokemonsNames);

    this.pokemonsSearchSuggestion = resultsSuggestions;
  }

  getBySuggestedPokemons(suggestions: string) {
    if (!suggestions.length) return;

    if (!this.pokemonsSearchSuggestion.length) {
      this.pokemonListToShow = [];
      this.totalPokemons = 0;
    }

    const pokemons: Array<Pokemon> = [];

    const hasMatchSuggestion = this.pokemonsSearchSuggestion.find(
      (pokemon) => pokemon.name === suggestions
    );

    if (hasMatchSuggestion) {
      const fullDataPokemon = this.pokemonsList.get(
        hasMatchSuggestion.name.toLocaleLowerCase()
      );
      if (fullDataPokemon) {
        pokemons.push(fullDataPokemon);
      }
    } else {
      this.pokemonsSearchSuggestion.forEach((pokemon) => {
        const fullDataPokemon = this.pokemonsList.get(
          pokemon.name.toLocaleLowerCase()
        );
        if (fullDataPokemon) {
          pokemons.push(fullDataPokemon);
        }
      });
    }

    this.pokemonListToShow = pokemons;
    this.totalPokemons = pokemons.length;
  }

  getOriginalListPokemons() {
    this.pokemonListToShow = [...this.pokemonsList.values()];
    this.totalPokemons = this.pokemonsList.size;
  }

  clearSuggestions() {
    this.pokemonsSearchSuggestion = [];
  }

  reset() {
    this.pokemonsList.clear();
    this.pokemonsNames = [];
    this.totalPokemons = 0;
    this.isLoading = false;
  }
}

export const pokemonListStore = new PokemonListStore();
