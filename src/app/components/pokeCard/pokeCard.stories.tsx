import type { Meta, StoryObj } from "@storybook/react-vite";

import { PokeCard } from "./pokeCard.component";

const meta = {
  title: "PokeCard",
  component: PokeCard,
} satisfies Meta<typeof PokeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "1",
    name: "Bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
    bg: "bg-gradient-to-br from-[#735797]/85 to-[#B6A136]/65",
  },
};
