/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        brand: {
          black: '#000000',
          white: '#FFFFFF',
          lightGray: '#F4F4F4',
          beige: '#E9E6DD',
          taupe: '#CBC3B7',
          darkGray: '#231F20',
          slate: '#838789',
          yellow: '#F59E0B',
        },
        compass: {
          black: '#000000',
          dark: '#1a1a1a',
          gray: '#757575',
          light: '#f4f4f4',
          gold: '#e3b65b',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slow-pan': 'slowPan 20s ease-in-out infinite alternate',
        'fade-in-down': 'fadeInDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slowPan: {
          '0%': { transform: 'scale(1.05) translateX(0)' },
          '100%': { transform: 'scale(1.05) translateX(-2%)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}