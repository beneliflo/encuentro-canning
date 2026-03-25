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