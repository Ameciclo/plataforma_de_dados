module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ameciclo: "#028083",
        amecicloTransparent: "rgba(2,128,131, .5)",
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
  variants: {
    extend: {},
  },
  plugins: [],
};
