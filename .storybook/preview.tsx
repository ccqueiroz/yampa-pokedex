import React from "react";
import { MainProvider } from "../src/app/providers/main.provider";
import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MainProvider>
        <Story />
      </MainProvider>
    ),
  ],
};

export default preview;
