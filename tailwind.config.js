/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prosely: {
          light: {
            bg: '#F8F9FB',
            surface: '#FFFFFF',
            surfaceHover: '#F2F4F8',
            primary: '#17191F',
            secondary: '#777D89',
            border: '#E8EAF0',
            accent: '#6558D3',
            accentHover: '#5648C4',
            accentLight: '#EEECFD',
          },
          dark: {
            bg: '#101114',
            surface: '#181A20',
            surfaceHover: '#20232B',
            primary: '#F4F4F5',
            secondary: '#9699A5',
            border: '#292B33',
            accent: '#8B80FF',
            accentHover: '#796DF6',
            accentLight: '#252342',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
        'card-dark': '0 4px 14px 0 rgba(0, 0, 0, 0.35)',
        'elevated': '0 12px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
