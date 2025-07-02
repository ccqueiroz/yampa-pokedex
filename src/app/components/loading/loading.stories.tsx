import type { Meta, StoryObj } from "@storybook/react-vite";

import { Loading } from "./loading.component";

const meta = {
  title: "Loading",
  component: Loading,
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
