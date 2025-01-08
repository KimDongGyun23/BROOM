/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    boxShadow: {
      md: '0 -1px 6.3px 0 rgba(0, 0, 0, 0.15)',
      sm: '0 -1px 12px 0 rgba(0, 0, 0, 0.04)',
    },
    extend: {
      fontFamily: {
        jalnan: ['Jalnan2'],
      },
      colors: {
        blue: {
          100: '#D9F1FE',
          200: '#B3DFFE',
          300: '#8CCAFE',
          400: '#70B6FD',
          500: '#4196FD',
          600: '#2F74D9',
          700: '#2056B6',
        },
        grey: {
          100: '#FBFBFB',
          200: '#F2F2F2',
          300: '#CBCBCB',
          400: '#ADADAD',
          500: '#8A8888',
          600: '#5E5E5E',
          700: '#3C3C3C',
        },
        red: {
          100: '#FF8E5D',
          200: '#FF5A28',
        },
        green: '#9CDE70',
      },
      utilities: {
        '.webkit-overflow-scrolling-touch': {
          '-webkit-overflow-scrolling': 'touch',
        },
      },
    },
  },
  plugins: [scrollbarHide],
}
