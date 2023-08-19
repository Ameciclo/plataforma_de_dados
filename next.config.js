/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
    forceSwcTransforms: true,
  },
  images: {
    domains: ['localhost:3300', 'res.cloudinary.com', 'f000.backblazeb2.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
