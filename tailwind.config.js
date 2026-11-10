/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FFF8EF',
          200: '#FDEFD9',
        },
        powder: {
          50: '#F0F6FD',
          100: '#DCEBFA',
          200: '#B8D8F7',
          300: '#94C4F3',
        },
        lavender: {
          50: '#F6F3FC',
          100: '#E9E1FA',
          200: '#D5C4F7',
          300: '#B89DF2',
        },
        peach: {
          50: '#FFF5F0',
          100: '#FFE0D2',
          200: '#FFC8B3',
          300: '#FFA788',
        },
        mint: {
          50: '#F2FAF4',
          100: '#DDEFE1',
          200: '#BDDEC4',
          300: '#97CAA1',
        },
        softpink: {
          50: '#FDF4F7',
          100: '#F8DCE5',
          200: '#F2BDCE',
          300: '#E995AF',
        },
        navy: {
          800: '#1F293D',
          900: '#27334A',
          950: '#151D2A',
        },
        coral: {
          400: '#FF8A75',
          500: '#FF6B52',
          600: '#E85338',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Nunito', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(39, 51, 74, 0.06)',
        'soft-lg': '0 14px 40px rgba(39, 51, 74, 0.08)',
        'pastel': '0 10px 25px -5px rgba(124, 92, 252, 0.12), 0 8px 10px -6px rgba(124, 92, 252, 0.08)',
      }
    },
  },
  plugins: [],
}

