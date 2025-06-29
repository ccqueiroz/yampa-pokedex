import { useI18n } from "@/app/hooks/usei18n.hook";
import { PokeGlassCard } from "../../pokeGlassCard/pokeGlassCard.component";
import { Skeleton } from "../../ui/skeleton";
import { PokeImageCard } from "./pokeImageCard/pokeImageCard.component";

export const PokeCardSkeleton = ({ urlImage }: { urlImage: string }) => {
  const { translation } = useI18n();

  return (
    <div className="w-full h-full max-w-[350px] min-w-80 min-h-40 md:w-[350px] animate-pulse">
      <PokeGlassCard
        bg={
          "bg-gradient-to-br from-transparent via-slate-500/80 to-transparent"
        }
        className="min-h-40 h-[200px] md:h-[210px] px-1 flex items-center justify-center"
      >
        <div className="w-full min-h-40 flex justify-between px-2 pt-4">
          <div className="h-full flex flex-col pt-4">
            <div className="mb-2 -mt-2">
              <h3 className="ml-1 text-2xl text-white drop-shadow-lg">
                {translation("accessibility.whos_that_pokemon")}
              </h3>
            </div>
            <Skeleton className="w-[64px] h-8 min-w-[63px] rounded-3xl bg-gray-300" />
            <div className="ml-1 flex gap-2 items-center mt-2">
              <span className="font-normal">
                <Skeleton className="w-[33px] h-4 rounded-sm bg-gray-300" />
              </span>
              <span className="font-light">
                <Skeleton className="w-[33px] h-4 rounded-sm bg-gray-300" />
              </span>
            </div>
          </div>
          <div className="p-2 mt-2">
            <PokeImageCard loading={true} urlImage={urlImage} />
          </div>
        </div>
        <div className="w-full flex items-center justify-around pb-2 mt-3">
          <span className="font-normal">
            <Skeleton className="w-[90px] h-4 rounded-sm bg-gray-300" />
          </span>
          <span className="font-light">
            <Skeleton className="w-[90px] h-4 rounded-sm bg-gray-300" />
          </span>
        </div>
      </PokeGlassCard>
    </div>
  );
};
