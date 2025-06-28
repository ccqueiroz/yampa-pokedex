import { Button } from "@/app/components/ui/button";
import { useI18n } from "@/app/hooks/usei18n.hook";
// import { TYPE_COLORS } from "@/infra/constants/TYPE_COLORS.constantes";
import type { TypesPokemon } from "../../pokeCard.component";

export const PokeTypeCard = ({
  id,
  types,
}: {
  id: string;
  types: TypesPokemon;
}) => {
  const { translation } = useI18n();
  // const types = [
  //   {
  //     name: translation(`pokemon_type.${'dragon'}`),
  //     color: TYPE_COLORS["dragon"],
  //     type: "grass",
  //   },
  //   {
  //     name: translation(`pokemon_type.${'fire'}`),
  //     color: TYPE_COLORS["fire"],
  //     type: "poison",
  //   },
  // ];

  if (!types.length) return <></>;

  return (
    <div className="w-max-[200px] flex justify-between mb-3 gap-2">
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
