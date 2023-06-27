/** @type {import('tailwindcss').Config} */
const isProd = process.env.NODE_ENV === 'production'
const baseUrl = isProd ? '/encuentro-canning' : ''

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1344px',
    },
    extend: {
      backgroundImage: {
        'section-pattern': `url('${baseUrl}/grain-pattern.png')`,
      }
    }
  },
  plugins: [],
}
