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
        accent: "#00A86B",
        "accent-dark": "#007A4E",
        "near-black": "#0F0F0F",
        "light-grey": "#F5F5F5",
      },
    },
  },
  plugins: [],
};
export default config;
