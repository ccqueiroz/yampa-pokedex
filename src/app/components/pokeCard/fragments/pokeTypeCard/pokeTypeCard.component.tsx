import { Button } from "@/app/components/ui/button";
import { useI18n } from "@/app/hooks/usei18n.hook";
import { usePokeCard } from "../../context/pokeCardProvider.component";

export const PokeTypeCard = () => {
  const { translation } = useI18n();
  const { types, id } = usePokeCard();

  if (!types.length) return <></>;

  return (
    <div className="w-max-[200px] flex justify-start mb-3 gap-2">
      {types.map((type) => (
        <Button
          className="cursor-default min-w-[63px] rounded-3xl"
          key={`${id}-${type.type}`}
          style={{ backgroundColor: type.color }}
          aria-label={`${translation(
            "accessibility.pokemon_type_of"
          )}${translation(`pokemon_type.${type.type}`)}`}
          size="sm"
        >
          {translation(`pokemon_type.${type.type}`)}
        </Button>
      ))}
    </div>
  );
};
