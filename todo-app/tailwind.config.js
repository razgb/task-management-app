import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F9F7F7",
          hover: colors.neutral[300], // hovers for cards
          border: colors.neutral[400],
          text: colors.neutral[600], // normal text
          ["heading-text"]: colors.neutral[800],
          dark: colors.neutral[950], // almost black
        },
        secondary: {
          // DEFAULT: "#3F72AF", // professional blue: buttons, ctas...etc.
          DEFAULT: "#112D4E",
          hover: "#CAD5E3", // professional blue: buttons, ctas...etc.
          dark: "#0A1B2E", // darker blue
          light: "#DBE2EF", // lighter blue for icons and background colors for widgets.
          ultralight: "#E4EAF1", // much lighter version, similar to grey accent colors in Apple websites
        },
        accent: {
          // might change progress to the dark blue.
          progress: "#FAF0CA", // toned down beige lemony color.
          error: "#ff9b9b", // professional salmon pink.
          success: "#DCE2C8", // professional limey beige pastel.
        },
      },
    },
  },
  plugins: [],
};
