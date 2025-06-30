import { observer } from "mobx-react-lite";
import { useModalPokemon } from "../../context/useModalPokemon.context";
import { cn } from "@/lib/utils";
import { PokeImage } from "@/app/components/pokeImage/pokeImage.component";

export const PokeImageModal = observer(() => {
  const pokeModalStore = useModalPokemon();

  return (
    <div className="flex justify-center mt-4 [&>picture]:max-h-[320px]">
      <PokeImage
        urlImage={pokeModalStore.pokemon?.imagePokemon ?? ""}
        className={cn("w-full max-w-xs max-h-[320px]")}
      />
    </div>
  );
});
