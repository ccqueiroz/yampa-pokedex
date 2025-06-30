import { DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { observer } from "mobx-react-lite";
import { useModalPokemon } from "../../context/useModalPokemon.context";

export const PokeHeaderModal = observer(() => {
  const pokeModalStore = useModalPokemon();

  return (
    <DialogHeader>
      <DialogTitle className="text-3xl text-primary">
        {pokeModalStore.pokemon?.name}
      </DialogTitle>
    </DialogHeader>
  );
});
