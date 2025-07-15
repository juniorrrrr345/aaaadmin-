/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*', // URL de votre boutique principale
      },
    ]
  },
}

module.exports = nextConfig