import { describe, it, expect, beforeEach } from "vitest";
import { ModalPokemon, type DataPokemonModal } from "./modalPokemon.store";

describe("ModalPokemon store", () => {
  let store: ModalPokemon;

  const mockPokemon: DataPokemonModal = {
    id: "150",
    name: "mewtwo",
    weight: 122,
    height: 20,
    imagePokemon: null,
    bgCardPoke: "purple",
    abilities: [
      { slot: 1, ability: "pressure" },
      { slot: 2, ability: "unnerve" },
    ],
    statusPokemon: {
      hp: 106,
      attack: 110,
      defense: 90,
      "special-attack": 154,
      "special-defense": 90,
      speed: 130,
      total: 680,
    },
    types: [{ color: "purple", type: "psychic" }],
  };

  beforeEach(() => {
    store = new ModalPokemon();
  });

  it("should initialize with default values", () => {
    expect(store.open).toBe(false);
    expect(store.loading).toBe(false);
    expect(store.pokemon).toBeNull();
  });

  it("should set loading to true", () => {
    store.setLoading(true);
    expect(store.loading).toBe(true);
  });

  it("should open modal and assign pokemon with image URL", () => {
    store.openModal(mockPokemon);

    expect(store.open).toBe(true);
    expect(store.pokemon).toEqual({
      ...mockPokemon,
      imagePokemon:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg",
    });
  });

  it("should open modal with null pokemon (no assignment)", () => {
    store.openModal(null);

    expect(store.open).toBe(true);
    expect(store.pokemon).toBeNull();
  });

  it("should close modal and clear pokemon", () => {
    store.openModal(mockPokemon);
    store.closeModal();

    expect(store.open).toBe(false);
    expect(store.pokemon).toBeNull();
  });

  it("should reset all state", () => {
    store.setLoading(true);
    store.openModal(mockPokemon);
    store.reset();

    expect(store.loading).toBe(false);
    expect(store.pokemon).toBeNull();
    expect(store.open).toBe(false);
  });
});
