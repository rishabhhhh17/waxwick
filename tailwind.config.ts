import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfaf5',
          100: '#f9f3e8',
          200: '#f1e8d4',
        },
        ember: {
          50: '#fbf3ec',
          100: '#f4dfca',
          200: '#e6b890',
          400: '#c97a3d',
          500: '#b85f24',
          600: '#9a4a18',
          700: '#7a3812',
        },
        clay: {
          900: '#2b1a10',
          800: '#3a2417',
          700: '#4d3120',
        },
        ink: '#1a120c',
        bone: '#f5efe2',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26, 18, 12, 0.04), 0 8px 24px rgba(26, 18, 12, 0.06)',
        warm: '0 18px 40px -16px rgba(184, 95, 36, 0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
