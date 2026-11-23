/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        nature: {
          base: '#F8FAF6',
          surface: '#FFFFFF',
          card: '#F1F4ED',
          border: '#E2E8DC',
          dark: '#0D2B1D',
          darker: '#081A12',
          forest: '#133E29',
          lightForest: '#1D5337',
          lime: '#A3E635',
          limeHover: '#8CD818',
          emerald: '#10B981',
          muted: '#627264',
        }
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(13, 43, 29, 0.05)',
        'card-hover': '0 16px 36px -6px rgba(13, 43, 29, 0.1)',
        'hero-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
        'lime-glow': '0 0 24px -2px rgba(163, 230, 53, 0.35)',
      }
    },
  },
  plugins: [],
}
