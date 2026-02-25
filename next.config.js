/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  images: { 
    unoptimized: false,
    qualities: [75, 85, 90],
  },
  assetPrefix: isProd ? '' : undefined,
}
 
module.exports = nextConfig