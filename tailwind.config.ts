import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        actions: {
          danger: "#FF3A29",
          info: "#02A0FC",
          success: "#34B53A",
          primary: "#4339F2",
          warning: "#FFB200",
        },
        light: {
          primary: "#DAD7FE",
          danger: "#FFE5D3",
          warning: "#FFF5CC",
          success: "#E2FBD7",
          info: "#CCF8FE",
        },
        black: "#000000",
        white: "#FFFFFF",
        grey: "#F8F8F8",
      },
    },
  },
  plugins: [],
};
export default config;
