import { Button } from "@/app/components/ui/button";
import { useI18n } from "@/app/hooks/usei18n.hook";
import { modalPokemonStore } from "@/infra/store/modalPokemon.store";
import { usePokeCard } from "../../context/pokeCardProvider.component";

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
  return (
    <div className="w-full flex items-center justify-around pb-2">
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
