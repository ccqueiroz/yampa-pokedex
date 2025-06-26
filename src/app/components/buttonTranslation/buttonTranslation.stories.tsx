import type { Meta, StoryObj } from "@storybook/react-vite";

import { ButtonTransalation } from "./buttonTransalation.component";

const meta = {
  title: "Button",
  component: ButtonTransalation,
} satisfies Meta<typeof ButtonTransalation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
