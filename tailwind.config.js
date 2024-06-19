/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "fancy-bg-blue-dark": "#044E66",
        "fancy-bg-blue-hover": "#7FAFBE",
        "fancy-bg-blue": "#005F7D",
        "fancy-green": "#00E482",
        "fancy-green-dark": "#02CE72",
        "fancy-yellow-hover": "#FFE53A",
        "fancy-yellow-dark": "#FF9500",
        "fancy-pink": "#FE4C62",
        "fancy-pink-dark": "#EA3852",
      },
      fontFamily: {
        Rowdies: ["Rowdies", "sans-serif"],

      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
