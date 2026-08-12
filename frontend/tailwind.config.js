/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#fd6c39",
          light: "#ffebda",
        },
        secondary: {
          DEFAULT: "#2ad9a8",
        },
      },
      fontFamily: {
        inter: ["Inter-Regular"],
        "inter-bold": ["Inter-Bold"],
      },
    },
  },
  plugins: [],
};
