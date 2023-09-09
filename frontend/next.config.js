/** @type {import('next').NextConfig} */
// next.config.js

const { hostname } = require('os');


const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.rollingstone.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'd2779tscntxxsw.cloudfront.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
      }
    ]
  },
}

module.exports = nextConfig
