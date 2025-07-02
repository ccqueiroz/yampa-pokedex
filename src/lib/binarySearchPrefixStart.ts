import type {  PokemonName } from "@/domain/pokemon/pokemon.dto";



export const binarySearchPrefixStart = (
  arr: Array<PokemonName>,
  prefix: string
): number => {
  let low = 0,
    high = arr.length - 1;
  const lowerPrefix = prefix.toLowerCase();

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    const name = arr[mid].name.toLowerCase();

    if (name.startsWith(lowerPrefix)) {
      while (
        mid > 0 &&
        arr[mid - 1].name.toLowerCase().startsWith(lowerPrefix)
      ) {
        mid--;
      }
      return mid;
    }

    if (name < lowerPrefix) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
};
