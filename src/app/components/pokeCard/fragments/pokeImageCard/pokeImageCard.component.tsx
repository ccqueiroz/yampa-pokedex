import { useI18n } from "@/app/hooks/usei18n.hook";
import { cn } from "@/lib/utils";

export const PokeImageCard = ({
  id,
  loading,
}: {
  id: string;
  loading: boolean;
}) => {
  const { translation } = useI18n();

  return (
    <picture>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={translation("accessibility.whos_that_pokemon")}
        className={cn(
          "w-[120px] h-[120px] max-w-[120px] max-h-[120px]",
          "transition-all duration-300",
          "shadow-[inset_0px_0px_8px_rgba(49,65,88,0.5),0_0_10px_rgba(255,255,255,0.4)]",
          "p-2 rounded-md",
          "bg-gradient-to-br from-transparent via-white/80 to-transparent",
          loading && "brightness-0 contrast-0"
        )}
      />
    </picture>
  );
};
