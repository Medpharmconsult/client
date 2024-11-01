import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#1341A3",
          200: "#10378b",
        },
        secondary: {
          100: "#8AD7F5",
          200: "#3964C0",
        },
        black: {
          100: "#333333",
        },
        grey: {
          100: "#757575",
          200: "#E5E8F0",
          300: "#E3E3E3",
          400: "#929292",
          500: "#f4f4f4",
        },
        error: {
          bg: "#FEF2F2",
          text: "#bf1c1c",
        },
      },
      backgroundImage: {
        "hero-desktop": "url('/hero-desktop.jpg')",
        "hero-mobile": "url('/hero-mobile.jpg')",
      },
    },
    screens: {
      "mh-lg": { raw: "(min-height: 700px && max-height: 800px)" },
      xs: { raw: "(min-width: 480px)" },
      ...defaultTheme.screens,
      ld: { raw: "(min-width: 1380px)" },
    },
  },
  plugins: [],
};
export default config;
