module.exports = {
  presets: ["next/babel"],

  overrides: [
    {
      plugins: [
        ["styled-components", { ssr: true }],

        [
          "babel-plugin-transform-require-ignore",
          {
            extensions: [".css"],
          },
        ],
      ],
    },
  ],
};
