import typeography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

import uiPreset from "./ui.preset.js";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,jsx,md,mdx,ts,tsx}"],
  presets: [uiPreset],
  plugins: [typeography],
};

export default config;
