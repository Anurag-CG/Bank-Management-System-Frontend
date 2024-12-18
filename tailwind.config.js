/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "play-fair": ["Playfair Display", "serif"],
        basker: ["Baskerville", "sans-serif"],
        jetBrain: ["JetBrains Mono", "sans-serif"],
        futura: ["Futura PT", "sans-serif"],
      },
    },
  },
  plugins: [],
};
