const defaultTheme = require("tailwindcss/defaultTheme");
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        "bounce-text": "bounceText 2s ease-in ",
        "bounce-text-gradient":
          "bounceText 2s ease-in , bounceTextGradient 2s linear infinite",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(calc(-150px * 7))" },
        },
        bounceText: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-60px)" },
          "60%": { transform: "translateY(-30px)" },
        },
        bounceTextGradient: {
          "0%,100%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "left center",
          },
          "50%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "right center",
          },
        },
      },

      colors: {
        dark: {
          sidebarBtn: {
            active: "white",
            inactive: "#828282",
          },
        },
        sidebarBtn: {
          active: "#000000",
          inactive: "#CCCCCC",
        },
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
        darkPrimary: "#2C2C2E",
        darkSecondary: "#1C1C1E",
        darkTextSecondary: "#EBEBF5",
      },
    },
  },
  plugins: [require("tailwindcss-bg-patterns")],
  darkMode: "class",
};
export default config;
