import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
        // Leave colors empty here; they are now managed in globals.css
    },
  },
  plugins: [],
};

export default config;