/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  images: { 
    unoptimized: false
  },
  assetPrefix: isProd ? '' : undefined,
  
  // Optimizaciones de build
  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },
}
 
module.exports = nextConfig