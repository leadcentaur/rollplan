/** @type {import('next').NextConfig} */
// next.config.js


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
      }
    ]
  },
}

module.exports = nextConfig
