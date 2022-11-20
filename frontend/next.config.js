/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.rottentomatoes.com',
      },
    ],
  },
}

module.exports = nextConfig
