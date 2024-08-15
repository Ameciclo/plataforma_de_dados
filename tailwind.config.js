/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        cover: "52vh",
        "no-cover": "25vh",
      },
      fontFamily: {
        custom: ["Open Sans"],
      },
      colors: {
        customGrey: "#F1F1F1",
        ameciclo: "#008080",
        ideciclo: "#5050aa",
        amecicloTransparent: "rgba(0,128,128, .5)",
        idecicloTransparent: "rgba(80,80,170, .5)",
        gray100Transparent: "rgba(247, 250, 252, .85)",
      },
      gridTemplateColumns: {
        fill: "200px repeat(auto-fill, 1fr) 300px",
      },
      gridTemplateRows: {
        fill: "minmax(100px, auto)",
      },
    },
  },
  plugins: [],
};
