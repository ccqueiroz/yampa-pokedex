import { useI18n } from "@/app/hooks/usei18n.hook";

export const EmptyPokemonList = () => {
  const { translation } = useI18n();
  return (
    <div className="relative w-full h-full flex justify-center">
      <picture className="relative w-full h-[400px] md:h-[600px]">
        <img
          src="src/assets/pokemons_not_found.png"
          alt={translation("inputs.empty_pokemon_list")}
          className="max-w-[320px] md:max-w-[600px] mx-auto"
        />
        <div className="w-full absolute top-2/3 -translate-y-6 md:translate-y-6 left-1/2 -translate-x-1/2">
          <p className="text-3xl text-primary text-center text-wrap">
            {translation("inputs.empty_pokemon_list")}
          </p>
        </div>
      </picture>
    </div>
  );
};
