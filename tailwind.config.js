/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('../public/clouds-bg.svg')",
        filter: "url(../public/Rectangle.svg)",
      },
      backgroundColor: {
        box: "rgba(255, 255, 255, 0.1)",
      },
      colors: {
        primary: "#EDBA4F",
        gray: "1px solid rgba(255, 255, 255, 0.2)",
      },
      backdropBlur: {
        "4xl": "100px",
      },
    },
  },
  plugins: [],
};
