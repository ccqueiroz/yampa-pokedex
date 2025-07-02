import { observer } from "mobx-react-lite";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { useModalPokemon } from "./context/useModalPokemon.context";
import { PokeHeaderModal } from "./fragments/pokeHeaderModal/pokeHeaderModal.component";
import { PokeImageModal } from "./fragments/pokeImageModal/pokeImageModal.component";
import { PokeTypesModal } from "./fragments/pokeTypesModal/pokeTypesModal.component";
import { PokeTabsModal } from "./fragments/pokeTabsModal/pokeTabsModal.component";

const ModalPokemon = observer(() => {
  const pokeModalStore = useModalPokemon();

  return (
    <Dialog
      open={pokeModalStore.open}
      onOpenChange={(open) => {
        if (!open) {
          pokeModalStore.closeModal();
        }
      }}
    >
      <DialogContent
        className="w-full max-w-[410px] px-6 py-6 rounded-2xl animate-fade-in scale-90 origin-center lg:scale-100"
        style={{ backgroundImage: pokeModalStore.pokemon?.bgCardPoke }}
      >
        <PokeHeaderModal />
        <div className="w-full">
          <PokeTypesModal />
          <PokeImageModal />
          <PokeTabsModal />
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default ModalPokemon;
