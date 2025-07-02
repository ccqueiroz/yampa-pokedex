import { PokeGlassCard } from "../pokeGlassCard/pokeGlassCard.component";
import { PokeTypeCard } from "./fragments/pokeTypeCard/pokeTypeCard.component";
import { PokeImageCard } from "./fragments/pokeImageCard/pokeImageCard.component";
import { PokeDetails } from "./fragments/pokerDetails/pokeDetails.components";
import { usePokeCard } from "./context/pokeCardProvider.component";

export const PokeCard = () => {
  const { nameFormated, statusPokemon, bgCardPoke, urlImage } = usePokeCard();

  return (
    <div className="group w-[320px] md:w-[350px] h-full max-w-[350px] min-w-80 min-h-40 scale-95 md:scale-100">
      <PokeGlassCard className="min-h-40 px-1" bg={bgCardPoke}>
        <div className="w-full min-h-40 flex justify-between px-2 pt-4">
          <div className="h-full flex flex-col pt-4">
            <div className="my-2 h-[45px]">
              <h3
                className="ml-1 text-white drop-shadow-lg"
                style={{
                  ...(nameFormated.length >= 13
                    ? nameFormated.length >= 15
                      ? { fontSize: "20px", lineHeight: "28px" }
                      : { fontSize: "22px", lineHeight: "30px" }
                    : { fontSize: "24px", lineHeight: "32px" }),
                }}
              >
                {nameFormated}
              </h3>
            </div>
            <PokeTypeCard />
            <div className="ml-1 flex gap-2 items-center">
              <span className="font-normal text-white ">Total</span>
              <span className="font-light text-white ">
                {statusPokemon.total}
              </span>
            </div>
          </div>
          <div className="p-2 mt-2">
            <PokeImageCard loading={false} urlImage={urlImage} />
          </div>
        </div>
        <PokeDetails />
      </PokeGlassCard>
    </div>
  );
};
