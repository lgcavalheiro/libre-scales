import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
import { THEMES } from "./src/shared/constants";

/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./src/**/*.{vue,js,ts}"],
  purge: ["./index.html", "./src/**/*.{vue,js,ts}"],
  plugins: [typography, daisyui],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: THEMES,
  },
};
