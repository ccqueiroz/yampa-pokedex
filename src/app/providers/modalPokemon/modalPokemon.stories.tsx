import type { Meta, StoryObj } from "@storybook/react-vite";

import { ModalPokemon } from "./modalPokemon.provider";
import { modalPokemonStore } from "@/infra/store/modalPokemon.store";

const meta = {
  title: "ModalPokemon",
  component: ModalPokemon,
} satisfies Meta<typeof ModalPokemon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    modalPokemonStore.openModal({
      id: "2",
      name: "Ivysaur",
      weight: 130,
      height: 10,
      imagePokemon: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg`,
      bgCardPoke: "linear-gradient(to bottom right, #7AC74Cd9, #A33EA1a6)",
      abilities: [
        { slot: 1, ability: "Overgrow" },
        { slot: 3, ability: "Chlorophyll" },
      ],
      statusPokemon: {
        hp: 60,
        attack: 62,
        defense: 63,
        "special-attack": 80,
        "special-defense": 80,
        speed: 60,
        total: 405,
      },
      types: [
        {
          color: "#7AC74C",
          type: "grass",
        },
        {
          color: "#A33EA1",
          type: "poison",
        },
      ],
    });

    return <ModalPokemon />;
  },
};
