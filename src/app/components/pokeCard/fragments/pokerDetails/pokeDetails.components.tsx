import { Button } from "@/app/components/ui/button";
import { useI18n } from "@/app/hooks/usei18n.hook";
import { modalPokemonStore } from "@/infra/store/modalPokemon.store";
import { usePokeCard } from "../../context/pokeCardProvider.component";
import { useAccordionStatusPokemon } from "@/app/context/useAccordionStatusPokemon.context";
import { accordionStatusPokemon } from "@/infra/store/accordionStatusPokemon.store";
import { useCallback } from "react";

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

  const handleOpenAccordion = useCallback(
    () => accordionStatusPokemon.openAccordion(id),
    [id]
  );

  const handleOpenModal = useCallback(
    () =>
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
      }),
    [
      abilities,
      bgCardPoke,
      height,
      id,
      nameFormated,
      statusPokemon,
      types,
      urlImage,
      weight,
    ]
  );

  return (
    <div className="w-full flex items-center justify-around pb-2">
      <Button
        variant="link"
        className="text-white md:hidden"
        onClick={handleOpenAccordion}
      >
        {!open
          ? translation("actions.expand")
          : translation("actions.rectract")}
      </Button>
      <Button variant="link" className="text-white" onClick={handleOpenModal}>
        {translation("actions.view_details")}
      </Button>
    </div>
  );
};
