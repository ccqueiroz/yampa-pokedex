import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header } from "./header.component";

const meta = {
  title: "Header",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
