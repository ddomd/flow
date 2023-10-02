import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.tsx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
        display: ["Big Shoulders Inline Text"],
      },
      boxShadow: {
        "slanted": "5px 5px black",
        "slanted-xs": "2px 2px black",
        "slanted-sm": "3px 3px black",
      },
    },
  },

  plugins: [forms],
};
