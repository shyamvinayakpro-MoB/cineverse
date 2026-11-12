/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-black': '#080808',
        'brand-surface': '#111113',
        'brand-card': '#16161a',
        'brand-gold': '#F59E0B',
        'brand-red': '#E50914',
        'brand-orange': '#F97316',
        card: '#16161a',
        cardHover: '#1f1f24',
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        cinemaRed: {
          500: '#EF4444',
          600: '#E50914',
          700: '#B91C1C',
        },
      },
      fontFamily: {
        cinema: ['Outfit', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'kenburns': 'kenburns 22s ease infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.0) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        }
      }
    },
  },
  plugins: [],
}
