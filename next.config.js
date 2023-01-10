/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'poweredwith.nyc3.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/images/domains/**'
      }
    ]
  }
}

module.exports = nextConfig
