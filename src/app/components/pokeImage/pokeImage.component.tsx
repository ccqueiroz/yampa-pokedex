import { useI18n } from "@/app/hooks/usei18n.hook";
import { cn } from "@/lib/utils";
import UnknownPokemon from "@/assets/unknown_pokemon.svg";

export const PokeImage = ({
  urlImage,
  className,
}: {
  urlImage: string;
  className?: string;
}) => {
  const { translation } = useI18n();

  return (
    <picture>
      <img
        src={urlImage}
        alt={translation("accessibility.whos_that_pokemon")}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = UnknownPokemon;
        }}
        className={cn(
          "transition-all duration-300",
          "shadow-[inset_0px_0px_8px_rgba(49,65,88,0.5),0_0_10px_rgba(255,255,255,0.4)]",
          "p-2 rounded-md",
          "bg-gradient-to-br from-transparent via-white/80 to-transparent",
          className
        )}
      />
    </picture>
  );
};
