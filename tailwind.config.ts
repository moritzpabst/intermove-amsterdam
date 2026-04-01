import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        accent: "#E8603C",
        "accent-dark": "#D4542F",
        "near-black": "#0F0F0F",
        "light-grey": "#F5F5F5",
      },
    },
  },
  plugins: [],
};
export default config;
