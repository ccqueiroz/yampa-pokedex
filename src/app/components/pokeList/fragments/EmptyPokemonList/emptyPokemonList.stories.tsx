import type { Meta, StoryObj } from "@storybook/react-vite";

import { EmptyPokemonList } from "./emptyPokemonList.component";

const meta = {
  title: "EmptyPokemonList",
  component: EmptyPokemonList,
} satisfies Meta<typeof EmptyPokemonList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
