import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1536px",
      },
    },
    screens: {
      ...defaultTheme.screens,
      xs: { raw: "(min-width: 350px) and (max-width: 640px)" },
      hsm: { raw: "(max-height: 760px) and (min-width: 768px)" },
    },
    extend: {},
  },
  plugins: [],
};
