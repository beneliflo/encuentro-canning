const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        pragmatica: ['pragmatica-extended', 'sans-serif'],
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
      },
      colors: {
        hueso: '#EFF0EF',
        dark: '#242424',
        cel: '#6C8A8C',
        turquesa: '#B78665',
      },
      backgroundImage: {
        'section-pattern': `url('/grain-pattern.png')`,
      },
      keyframes: {
        slideFadeUp: {
          '0%': { transform: 'translateY(10%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        zoomFadeIn: {
          '0%': { transform: 'scale(3)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        slideFadeUp: 'slideFadeUp 1s ease',
        zoomFadeIn: 'zoomFadeIn 1s ease',
      },
    },
  },
  plugins: [],
};
