import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputSearch } from "./inputSearch.component";

const meta = {
  title: "Input Search",
  component: InputSearch,
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
