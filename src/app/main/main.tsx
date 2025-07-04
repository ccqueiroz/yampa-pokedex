import { Header } from "@/app/components/header/header.component";
import { PokeList } from "../components/pokeList/pokelist.component";
import bgGrassField from "@/assets/bg-grass-field-pokemon.webp";

export const Main = () => {
  return (
    <section
      className="min-w-screen xl:h-screen hsm:h-full relative min-h-screen"
      style={{
        backgroundImage: `url(${bgGrassField})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container max-auto px-4 relative z-10">
        <Header />
      </div>
      <div id="section-main" className="container px-0 sm:px-4">
        <PokeList />
      </div>
    </section>
  );
};
