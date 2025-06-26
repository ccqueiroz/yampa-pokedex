import { ButtonTransalation } from "../buttonTranslation/buttonTransalation.component";
import { InputSearch } from "../inputSearch/inputSearch.component";

export const Header = () => {
  return (
    <header
      aria-label="Header Pokédex"
      className="
      w-full
      grid
      grid-cols-2
      grid-rows-2
      gap-4
      p-4
      md:grid-cols-3
      md:grid-rows-1
    "
    >
      <div className="col-span-1 row-span-1 flex items-center justify-start">
        <h1 className="text-xl text-primary font-bold">Pokédex</h1>
      </div>
      <div className="col-span-1 row-span-1 flex justify-end items-center md:col-start-3">
        <ButtonTransalation />
      </div>
      <div className="col-span-2 row-span-1 md:col-span-1 md:col-start-2 md:row-start-1 flex justify-center items-center w-full">
        <InputSearch />
      </div>
    </header>
  );
};
