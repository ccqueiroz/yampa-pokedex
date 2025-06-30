import { useModalPokemon } from "@/app/providers/modalPokemon/context/useModalPokemon.context";
import { TabsContent } from "@/app/components/ui/tabs";
import { useI18n } from "@/app/hooks/usei18n.hook";
import { cn } from "@/lib/utils";
import { observer } from "mobx-react-lite";

const styleBase = "w-full flex justify-start items-center gap-2";
const styleLabel = "text-md font-semibold text-primary";
const styleValue = "text-md font-light text-primary/90";

export const TabContentDetails = observer(() => {
  const { translation } = useI18n();
  const pokeModalStore = useModalPokemon();

  return (
    <TabsContent value="details">
      <div>
        <div className={cn(styleBase, "flex-wrap")}>
          <span className={cn(styleLabel)}>
            {translation(`tabs_modal.details.body_content.abilities`)}
          </span>
          <div className="flex items-center gap-2">
            {pokeModalStore.pokemon?.abilities.map((ability) => (
              <span
                key={`${ability.slot}-${ability.ability}`}
                className={cn(styleValue)}
              >
                {ability.ability}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full flex mt-1">
          <div className="flex-grow flex items-center justify-start gap-2">
            <span className={cn(styleLabel)}>
              {translation(`tabs_modal.details.body_content.height`)}
            </span>
            <span className={cn(styleValue)}>
              {pokeModalStore.pokemon?.height}
            </span>
          </div>
          <div className="flex-grow flex items-center justify-start gap-2">
            <span className={cn(styleLabel)}>
              {translation(`tabs_modal.details.body_content.weight`)}
            </span>
            <span className={cn(styleValue)}>
              {pokeModalStore.pokemon?.weight}
            </span>
          </div>
        </div>
      </div>
    </TabsContent>
  );
});
