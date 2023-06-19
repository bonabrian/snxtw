const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
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
          100: '#f1e9ff',
          200: '#e3d3ff',
          300: '#d4bdff',
          400: '#c6adff',
          500: '#b192ff',
          600: '#876adb',
          700: '#6249b7',
          800: '#422e93',
          900: '#2b1c7a',
        },
      },
      minWidth: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
      },
      transitionProperty: {
        common:
          'background-color,border-color,color,fill,stroke,opacity,box-shadow,transform',
      },
      transitionDuration: {
        'ultra-fast': '50ms',
        faster: '100ms',
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
        slower: '400ms',
        'ultra-slow': '500ms',
      },
    },
  },
  plugins: [],
}
