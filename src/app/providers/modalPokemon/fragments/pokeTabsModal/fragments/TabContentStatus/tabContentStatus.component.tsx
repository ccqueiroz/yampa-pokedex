import { useModalPokemon } from "@/app/providers/modalPokemon/context/useModalPokemon.context";
import { TabsContent } from "@/app/components/ui/tabs";
import { useI18n } from "@/app/hooks/usei18n.hook";
import { cn } from "@/lib/utils";
import { observer } from "mobx-react-lite";

const styleBase = "w-full flex justify-between items-center relative";
const styleWithUnderline =
  "before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-[#484869] before:opacity-80";
const styleLabel = "text-sm font-semibold text-primary";
const styleValue = "text-sm font-light text-primary/90";

export const TabContentStatus = observer(() => {
  const { translation } = useI18n();
  const pokeModalStore = useModalPokemon();
  return (
    <TabsContent value="status">
      <div className="w-full flex flex-col gap-2">
        <div className={cn(styleBase, styleWithUnderline)}>
          <span className={cn(styleLabel)}>
            {translation(`pokemon_status.hp`)}
          </span>
          <span className={cn(styleValue)}>
            {pokeModalStore.pokemon?.statusPokemon.hp}
          </span>
        </div>
        <div className={cn(styleBase, styleWithUnderline)}>
          <span className={cn(styleLabel)}>
            {translation(`pokemon_status.attack`)}
          </span>
          <span className={cn(styleValue)}>
            {pokeModalStore.pokemon?.statusPokemon.attack}
          </span>
        </div>
        <div className={cn(styleBase, styleWithUnderline)}>
          <span className={cn(styleLabel)}>
            {translation(`pokemon_status.defense`)}
          </span>
          <span className={cn(styleValue)}>
            {pokeModalStore.pokemon?.statusPokemon.defense}
          </span>
        </div>
        <div className={cn(styleBase, styleWithUnderline)}>
          <span className={cn(styleLabel)}>
            {translation(`pokemon_status.${"special-attack"}`)}
          </span>
          <span className={cn(styleValue)}>
            {pokeModalStore.pokemon?.statusPokemon["special-attack"]}
          </span>
        </div>
        <div className={cn(styleBase, styleWithUnderline)}>
          <span className={cn(styleLabel)}>
            {translation(`pokemon_status.${"special-defense"}`)}
          </span>
          <span className={cn(styleValue)}>
            {pokeModalStore.pokemon?.statusPokemon["special-defense"]}
          </span>
        </div>
        <div className={cn(styleBase, styleWithUnderline)}>
          <span className={cn(styleLabel)}>
            {translation(`pokemon_status.speed`)}
          </span>
          <span className={cn(styleValue)}>
            {pokeModalStore.pokemon?.statusPokemon.speed}
          </span>
        </div>
        <div className={cn(styleBase)}>
          <span className={cn(styleLabel)}>
            {translation(`pokemon_status.total`)}
          </span>
          <span className={cn(styleValue)}>
            {pokeModalStore.pokemon?.statusPokemon.total}
          </span>
        </div>
      </div>
    </TabsContent>
  );
});
