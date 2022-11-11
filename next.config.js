/** @type {import('next').NextConfig} */
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

module.exports = nextConfig
