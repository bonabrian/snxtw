/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // uses `next/font` see `app/layout.tsx`
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // change your color schema here
        primary: {
          100: '#F2E9FF',
          200: '#E3D3FF',
          300: '#D4BDFF',
          400: '#C6ACFF',
          500: '#B191FF',
          600: '#8769DB',
          700: '#6249B7',
          800: '#422E93',
          900: '#2C1B7A',
        },
      },
    },
  },
  plugins: [],
}
