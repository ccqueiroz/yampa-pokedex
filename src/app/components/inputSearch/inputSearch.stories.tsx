import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputSearch } from "./inputSearch.component";
import { pokemonListStore } from "@/infra/store/pokemonList.store";

const meta = {
  title: "InputSearch",
  component: InputSearch,
} satisfies Meta<typeof InputSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

pokemonListStore.pokemonsSearchSugestion = [
  { id: "1", name: "bulbasaur" },
  { id: "4", name: "charmander" },
  { id: "7", name: "squirtle" },
];

export const Default: Story = {
  render: () => {
    return <InputSearch />;
  },
};

Default.storyName = "Primary";
