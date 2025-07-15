/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Désactiver les erreurs TypeScript pendant le build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Désactiver les erreurs ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig