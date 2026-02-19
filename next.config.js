/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  images: { 
    unoptimized: false
  },
  assetPrefix: isProd ? '' : undefined,
}
 
module.exports = nextConfig