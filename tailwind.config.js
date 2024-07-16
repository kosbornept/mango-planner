/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#00bf63",
        dark: "#050403",
        mango: {
          50: "#fabc5c",
          100: "#fec81d",
          200: "#ffbd59",
          300: "#e8b31f",
        },
        light: "#fefefe",
        gray: "#7C807C",

      }
    },
    fontFamily: {
      psugar: ["MoreSugar-Regular", "serif"],
      pubuntu: ["Ubuntu-Regular", "sans-serif"],
      pubuntubold: ["Ubuntu-Bold", "sans-serif"],
    }
  },
  plugins: [],
}