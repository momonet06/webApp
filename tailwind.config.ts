import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      amiri: ["var(--font-amiri)"],
      lateef: ["var(--font-lateef)"],
    },
    corePlugins: {
      aspectRatio: false,
    },
    extend: {
      colors: {
        dark: "hsl(var(--dark))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "2px 2px 4px var(--tw-shadow-color)",
        lg: "8px 8px 16px var(--tw-shadow-color)",
      },
      aspectRatio: {
        "4/1": "4/1", //25%
        "3/1": "3/1", //33%
        "5/2": "5/2", //40%
        "21/9": "21/9", //42%
        "4/3": "4/3", //75%
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
    function ({ matchUtilities, theme }: { matchUtilities: any; theme: any }) {
      matchUtilities(
        {
          "text-shadow": (value: any) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    },
  ],
};
export default config;
