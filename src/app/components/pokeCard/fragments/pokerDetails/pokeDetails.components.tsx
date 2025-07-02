import { Button } from "@/app/components/ui/button";
import { useI18n } from "@/app/hooks/usei18n.hook";
import { modalPokemonStore } from "@/infra/store/modalPokemon.store";
import { usePokeCard } from "../../context/pokeCardProvider.component";
import { useAccordionStatusPokemon } from "@/app/context/useAccordionStatusPokemon.context";
import { accordionStatusPokemon } from "@/infra/store/accordionStatusPokemon.store";

export const PokeDetails = () => {
  const { translation } = useI18n();
  const {
    id,
    weight,
    abilities,
    bgCardPoke,
    height,
    statusPokemon,
    types,
    urlImage,
    nameFormated,
  } = usePokeCard();
  const { idCard } = useAccordionStatusPokemon();

  const open = idCard === id;

  return (
    <div className="w-full flex items-center justify-around pb-2">
      <Button
        variant="link"
        className="text-white md:hidden"
        onClick={() => accordionStatusPokemon.openAccordion(id)}
      >
        {!open
          ? translation("actions.expand")
          : translation("actions.rectract")}
      </Button>
      <Button
        variant="link"
        className="text-white"
        onClick={() =>
          modalPokemonStore.openModal({
            id: id.toString(),
            weight,
            abilities,
            bgCardPoke,
            height,
            name: nameFormated,
            statusPokemon,
            types,
            imagePokemon: urlImage,
          })
        }
      >
        {translation("actions.view_details")}
      </Button>
    </div>
  );
};
