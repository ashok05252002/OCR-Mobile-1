/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        primaryDark: '#0056CC',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F7',
          200: '#E5E5EA',
          300: '#D1D1D6',
          400: '#C7C7CC',
          500: '#AEAEB2',
          600: '#8E8E93',
          700: '#636366',
          800: '#48484A',
          900: '#1C1C1E',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        mobile: '430px',
      },
      minWidth: {
        mobile: '375px',
      }
    },
  },
  plugins: [],
};
