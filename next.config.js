/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "pixabay.com" },
    ],
  },
};

module.exports = nextConfig;
