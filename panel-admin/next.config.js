/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true // Cette option est maintenant activée par défaut dans Next.js 13+
  },
  images: {
    domains: ['localhost', 'vercel.app'],
  },
}

module.exports = nextConfig