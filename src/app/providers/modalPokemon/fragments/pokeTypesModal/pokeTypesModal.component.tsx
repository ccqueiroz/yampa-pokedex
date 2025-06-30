import { observer } from "mobx-react-lite";
import { useModalPokemon } from "../../context/useModalPokemon.context";
import { Button } from "@/app/components/ui/button";
import { useI18n } from "@/app/hooks/usei18n.hook";

export const PokeTypesModal = observer(() => {
  const { translation } = useI18n();
  const pokeModalStore = useModalPokemon();

  if (!pokeModalStore.pokemon?.types) return <></>;

  const { id, types } = pokeModalStore.pokemon;

  return (
    <div>
      <div className="w-max-[300px] flex justify-start mb-3 gap-2">
        {types.map((type) => (
          <Button
            className="cursor-default min-w-20 rounded-3xl text-base"
            key={`${id}-${type.type}`}
            style={{ backgroundColor: type.color }}
            aria-label={`${translation(
              "accessibility.pokemon_type_of"
            )}${translation(`pokemon_type.${type.type}`)}`}
          >
            {translation(`pokemon_type.${type.type}`)}
          </Button>
        ))}
      </div>
    </div>
  );
});
