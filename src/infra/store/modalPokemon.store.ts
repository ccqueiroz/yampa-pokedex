import type {
  AbilitiesPokemon,
  StatusPokemon,
  TypesPokemon,
} from "@/domain/pokemon/pokemon.dto";
import { makeAutoObservable } from "mobx";

export type DataPokemonModal = {
  id: string;
  name: string;
  weight: number;
  height: number;
  imagePokemon: string | null;
  bgCardPoke: string;
  abilities: AbilitiesPokemon;
  statusPokemon: StatusPokemon;
  types: TypesPokemon;
};

export class ModalPokemon {
  open: boolean = false;
  loading: boolean = false;
  pokemon: DataPokemonModal | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  openModal(pokemon: DataPokemonModal | null) {
    this.open = true;

    if (pokemon && pokemon?.id) {
      this.pokemon = {
        ...pokemon,
        imagePokemon: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
      };
    }
  }

  closeModal() {
    this.open = false;
    this.pokemon = null;
  }

  reset() {
    this.loading = false;
    this.pokemon = null;
    this.open = false;
  }
}

export const modalPokemonStore = new ModalPokemon();
