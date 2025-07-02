import type { PokemonName } from "@/domain/pokemon/pokemon.dto";
import { binarySearchPrefixStart } from "./binarySearchPrefixStart";

export const searchByPrefix = (
  input: string,
  items: Array<PokemonName>
): Array<PokemonName> => {
  if (input.length < 3) return [];
  const start = binarySearchPrefixStart(items, input);
  if (start === -1) return [];

  const results: Array<PokemonName> = [];
  const lowerPrefix = input.toLowerCase();

  for (let i = start; i < items.length; i++) {
    const name = items[i].name.toLowerCase();
    if (name.startsWith(lowerPrefix)) {
      results.push(items[i]);
    } else {
      break;
    }
  }

  return results;
};
