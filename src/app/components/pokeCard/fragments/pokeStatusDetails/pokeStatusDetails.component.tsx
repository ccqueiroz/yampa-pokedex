import { observer } from "mobx-react-lite";
import { usePokeCard } from "../../context/pokeCardProvider.component";
import { useAccordionStatusPokemon } from "@/app/context/useAccordionStatusPokemon.context";
import { cn } from "@/lib/utils";
import { useI18n } from "@/app/hooks/usei18n.hook";

const styleBase = "w-full flex justify-start items-center gap-2";
const styleLabel = "text-sm text-white";
const styleValue = "text-sm font-light text-white/80";

export const PokeStatusDetails = observer(() => {
  const { translation } = useI18n();
  const { statusPokemon, id } = usePokeCard();
  const { idCard } = useAccordionStatusPokemon();

  const open = idCard === id;

  return (
    <div
      className={cn(
        "w-full ml-1 flex flex-col gap-1 items-center",
        "transition-height",
        !open ? "animate-accordion-open" : "animate-accordion-close"
      )}
      aria-expanded={open}
    >
      {open && (
        <>
          <div className={cn(styleBase)}>
            <span className={cn(styleLabel)}>
              {translation(`pokemon_status.hp`)}
            </span>
            <span className={cn(styleValue)}>{statusPokemon.hp}</span>
          </div>
          <div className={cn(styleBase)}>
            <span className={cn(styleLabel)}>
              {translation(`pokemon_status.attack`)}
            </span>
            <span className={cn(styleValue)}>{statusPokemon.attack}</span>
          </div>
          <div className={cn(styleBase)}>
            <span className={cn(styleLabel)}>
              {translation(`pokemon_status.defense`)}
            </span>
            <span className={cn(styleValue)}>{statusPokemon.defense}</span>
          </div>
          <div className={cn(styleBase)}>
            <span className={cn(styleLabel)}>
              {translation(`pokemon_status.${"special-attack"}`)}
            </span>
            <span className={cn(styleValue)}>
              {statusPokemon["special-attack"]}
            </span>
          </div>
          <div className={cn(styleBase)}>
            <span className={cn(styleLabel)}>
              {translation(`pokemon_status.${"special-defense"}`)}
            </span>
            <span className={cn(styleValue)}>
              {statusPokemon["special-defense"]}
            </span>
          </div>
          <div className={cn(styleBase)}>
            <span className={cn(styleLabel)}>
              {translation(`pokemon_status.speed`)}
            </span>
            <span className={cn(styleValue)}>{statusPokemon.speed}</span>
          </div>
        </>
      )}
      <div className={cn(styleBase)}>
        <span className={cn(styleLabel)}>
          {translation(`pokemon_status.total`)}
        </span>
        <span className={cn(styleValue)}>{statusPokemon.total}</span>
      </div>
    </div>
  );
});
