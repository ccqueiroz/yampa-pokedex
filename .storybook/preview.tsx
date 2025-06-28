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
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MainProvider>
        <section className="min-w-screen xl:h-screen hsm:h-full relative min-h-screen overflow-hidden">
          <div className="container max-auto px-4 relative z-10">
            <Story />
          </div>
        </section>
      </MainProvider>
    ),
  ],
};

export default preview;
