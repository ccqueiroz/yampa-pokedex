import {
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/app/components/ui/command";
import { useI18n } from "@/app/hooks/usei18n.hook";
import pokedexSvg from "@/assets/pokedex.png";

export const WrapperGroupSuggestions = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { translation } = useI18n();

  return (
    <div
      role="listbox"
      className="min-h-4 absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none"
    >
      <CommandList>
        <CommandEmpty className="p-0">
          <div className="w-full flex p-1 gap-1">
            <div className="pt-1 ml-2">
              <picture>
                <img
                  src={pokedexSvg}
                  className="w-12 h-8"
                  alt={translation("accessibility.pokedex")}
                  loading="lazy"
                />
              </picture>
            </div>
            <span className="text-start text-sm text-primary text-wrap">
              {translation("inputs.empty_pokemon_list_suggestion")}
            </span>
          </div>
        </CommandEmpty>
        <CommandGroup className="h-full overflow-auto">{children}</CommandGroup>
      </CommandList>
    </div>
  );
};
