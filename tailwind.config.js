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
        }
      }
    },
  },
  plugins: [],
}