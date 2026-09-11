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

  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  async rewrites() {
    return [
      // FAM 2026 vive en su propio deploy de Vercel (repo FAM2026); acá solo
      // se proxea para que se sirva en encuentrocanning.org/fam2026. El
      // destino ya devuelve todo prefijado con /fam2026 (mismo basePath).
      {
        source: '/fam2026',
        destination: 'https://fam2026.vercel.app/fam2026',
      },
      {
        source: '/fam2026/:path*',
        destination: 'https://fam2026.vercel.app/fam2026/:path*',
      },
    ]
  },

  async redirects() {
    return [
      // Redirect /felicitaciones to /tcp for encuentrocanning.org
      {
        source: '/felicitaciones',
        has: [
          {
            type: 'host',
            value: 'encuentrocanning.org',
          },
        ],
        destination: '/tcp',
        permanent: true,
      },
      {
        source: '/felicitaciones',
        has: [
          {
            type: 'host',
            value: 'www.encuentrocanning.org',
          },
        ],
        destination: '/tcp',
        permanent: true,
      },
      // Redirect /tcp/felicitaciones to /tcp for encuentrocanning.org
      {
        source: '/tcp/felicitaciones',
        has: [
          {
            type: 'host',
            value: 'encuentrocanning.org',
          },
        ],
        destination: '/tcp',
        permanent: true,
      },
      {
        source: '/tcp/felicitaciones',
        has: [
          {
            type: 'host',
            value: 'www.encuentrocanning.org',
          },
        ],
        destination: '/tcp',
        permanent: true,
      },
      // Redirect /felicitaciones to / for tcp.emubaescuela.com
      {
        source: '/felicitaciones',
        has: [
          {
            type: 'host',
            value: 'tcp.emubaescuela.com',
          },
        ],
        destination: '/',
        permanent: true,
      },
      // Redirect /tcp/felicitaciones to / for tcp.emubaescuela.com
      {
        source: '/tcp/felicitaciones',
        has: [
          {
            type: 'host',
            value: 'tcp.emubaescuela.com',
          },
        ],
        destination: '/',
        permanent: true,
      },
    ]
  },
}
 
module.exports = nextConfig