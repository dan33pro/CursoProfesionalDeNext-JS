/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa') ({
  dest: 'public',
  include: ['production'],
  register: true,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 'api.lorem.space', 'placeimg.com', 'www.pngkey.com'],
  },
}

module.exports = withPWA(nextConfig);
