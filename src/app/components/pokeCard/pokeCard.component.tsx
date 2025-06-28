import type { Pokemon } from "@/domain/pokemon/pokemon.dto";
import { PokeGlassCard } from "../pokeGlassCard/pokeGlassCard.component";
import { PokeTypeCard } from "./fragments/pokeTypeCard/pokeTypeCard.component";
import { PokeImageCard } from "./fragments/pokeImageCard/pokeImageCard.component";
import { PokeDetails } from "./fragments/pokerDetails/pokeDetails.components";
import { useEffect, useMemo, useState } from "react";
import { PokeCardSkeleton } from "./fragments/pokeCardSkeleton.component";
import { useI18n } from "@/app/hooks/usei18n.hook";
import { TYPE_COLORS } from "@/infra/constants/TYPE_COLORS.constantes";

type PokeCardProps = Pokemon & { bg: string };
export type TypesPokemon = Array<{ color: string; type: string }>;
export const PokeCard = ({
  id,
  name,
  url,
}: // bg = `bg-gradient-to-br from-[#6F35FC]/85 to-[#6390F0]/65 `,
PokeCardProps) => {
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState<TypesPokemon>([]);
  const { translation } = useI18n();
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await new Promise((r) => setTimeout(r, 1000));
        const response = await fetch(url);

        const responseData = await response.json().catch(() => null);

        const typesArr: TypesPokemon = responseData?.types?.map((t: any) => {
          const type = t?.type?.name;
          return {
            color: TYPE_COLORS[type],
            type: type,
          };
        });

        setTypes(typesArr);
        console.log("responseData", responseData);
        if (active) {
          // setDetails(data);
          setLoading(false);
        }
      } catch {
        // erro de fetch
      }
    })();
    return () => {
      active = false;
    };
  }, [id, translation, url]);

  const bgPoke = useMemo(() => {
    const from = TYPE_COLORS[types[0]?.type] ?? "#ffffff";
    const to = TYPE_COLORS[types[1]?.type] ?? from;
    return `linear-gradient(to bottom right, ${from}d9, ${to}a6)`;
  }, [types]);

  if (loading) {
    return <PokeCardSkeleton id={id} loading={true} />;
  }

  return (
    <div className="group w-[320px] md:w-[350px] h-full max-w-[350px] min-w-80 min-h-40 scale-95 md:scale-100">
      <PokeGlassCard className="min-h-40 px-1" bg={bgPoke}>
        <div className="w-full min-h-40 flex justify-between px-2 pt-4">
          <div className="h-full flex flex-col pt-4">
            <div className="my-2">
              <h3 className="ml-1 text-2xl text-white drop-shadow-lg">
                {name}
              </h3>
            </div>
            <PokeTypeCard id={id} types={types} />
            <div className="ml-1 flex gap-2 items-center">
              <span className="font-normal text-white ">Total</span>
              <span className="font-light text-white ">678</span>
            </div>
          </div>
          <div className="p-2 mt-2">
            <PokeImageCard id={id} loading={false} />
          </div>
        </div>
        <PokeDetails />
      </PokeGlassCard>
    </div>
  );
};

/***
 *  types: Array<> : { type: { name: grass }}
 *  wheight: 69
 *  stats: Array<> : { base_stat: 45, stat: { name: 'hp' }}
 *  hp attack defense special-attack special-defense spped
 *
 *
 */
