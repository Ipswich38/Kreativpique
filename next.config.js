/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Disable ESLint during builds for deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript check during builds for deployment
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['your-domain.com'], // Add any external image domains you use
  },
}

module.exports = nextConfig