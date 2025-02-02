import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      borderRadius: {
        5: "5px",
      },
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
          600: "#b1b1b1",
          700: "#f6f7f9",
        },
        error: {
          bg: "#FEF2F2",
          text: "#bf1c1c",
        },
      },
    },
    screens: {
      ...defaultTheme.screens,
      cxxl: { raw: "(min-width: 1380px)" },
      cxl: {
        raw: "(min-width: 1024px) and (max-height: 1000px)",
      },
      clg: {
        raw: "(min-width: 1100px)",
      },
      xs: { raw: "(min-width: 480px)" },
      xxs: { raw: "(min-width: 400px)" },
      md2: { raw: "(min-width: 840px)" },
    },
  },
  plugins: [],
};
export default config;
