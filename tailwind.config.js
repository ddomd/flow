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

  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
        display: ["Big Shoulders Inline Text"],
      },
      colors: {
        // "neon-pink": "#fe16f6",
        // "neon-yellow": "#fefe16",
        // "pastel-pink": '#FFB6C1',
        // "pastel-blue": '#ADD8E6',
        // "pastel-green": '#98FB98',
        // "pastel-purple": '#E6E6FA',
        // "pastel-yellow": '#FFFFE0',
        // "pastel-peach": '#FFDAB9',
        // "pastel-lavender": '#E0BBE4',
        // "pastel-mint": '#B2FAB4',
        // "pastel-coral": '#FF6B6B',
        // "pastel-turquoise": '#AFEEEE',
        // "pastel-orange": '#FFD700',
        // "pastel-sky-blue": '#87CEEB',
        // "pastel-salmon": '#FA8072',
        // "pastel-lilac": '#C8A2C8',
        // "pastel-teal": '#008080',
        // "pastel-gold": '#FFD700',
        // "pastel-apricot": '#FDD5B1',
        // "pastel-slate-blue": '#6A5ACD',
      },
      boxShadow: {
        "slanted": "5px 5px black",
        "slanted-xs": "2px 2px black",
        "slanted-sm": "3px 3px black",
      },
      dropShadow: {
        text: "1px 1px 0px white",
      },
      textShadow: {
        default:
          "1px 1px 0px #000, 3px 3px 0px #000, -1px -1px 0px #000,  1px -1px 0px #000, -1px 1px 0px #000, 1px 1px 0px #000",
        light:
          "1px 1px 0px #fff, 3px 3px 0px #fff, -1px -1px 0px #fff,  1px -1px 0px #fff, -1px 1px 0px #fff, 1px 1px 0px #fff",
      },
    },
  },

  plugins: [forms],
};
