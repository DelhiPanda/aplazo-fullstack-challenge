import preset from "./projects/shared-ui/src/config/tailwind-preset.config.mjs";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: ["./src/app/**/*.{html,ts}", "./src/tests/**/*.{html,ts}"],
};
