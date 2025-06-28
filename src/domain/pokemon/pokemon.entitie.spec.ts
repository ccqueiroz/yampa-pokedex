import { describe, expect, it } from "vitest";
import { PokemonEntitie } from "./pokemon.entitie";

interface MockPokemonData {
  name: string;
  url: string;
}

const validMocks: MockPokemonData[] = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
];

const invalidMocks: MockPokemonData[] = [
  { name: "garurumon", url: "https://pokeapi.co/api/v2/pokemon/" },
  { name: "devimon", url: "https://pokeapi.co/api/v2/pokemon/abc/" },
  { name: "empty", url: "" },
];

describe("PokemonEntitie", () => {
  it("deve criar uma entidade válida e extrair o id corretamente", () => {
    const entitie = PokemonEntitie.create(validMocks[0]);

    expect(entitie).toBeInstanceOf(PokemonEntitie);
    expect(entitie.name).toBe("Bulbasaur");
    expect(entitie.url).toBe("https://pokeapi.co/api/v2/pokemon/1/");
    expect(entitie.id).toBe("1");
  });

  it("deve criar várias entidades com ids corretos", () => {
    const entities = validMocks.map(PokemonEntitie.create);

    expect(entities[0].id).toBe("1");
    expect(entities[1].id).toBe("2");
    expect(entities[2].id).toBe("3");
  });

  it("deve lançar erro se a url estiver malformada (sem id)", () => {
    expect(() => PokemonEntitie.create(invalidMocks[0])).toThrowError(
      /Invalid Pokémon URL/
    );
  });

  it("deve lançar erro se a url for vazia", () => {
    expect(() => PokemonEntitie.create(invalidMocks[2])).toThrowError();
  });
});
