import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        script: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        plum: {
          900: '#3D1A35',
          800: '#4E2344',
          700: '#6B2C5F',
          600: '#8A3B7A',
          500: '#A85396',
        },
        rose: {
          900: '#8B4A5C',
          700: '#C47B8B',
          500: '#E8A5B5',
          300: '#F5D5DC',
          100: '#FBEDF0',
        },
        gold: {
          700: '#A88449',
          600: '#C9A961',
          500: '#D4B97D',
          300: '#E8D5A8',
        },
        ivory: {
          50: '#FEFCF8',
          100: '#FAF7F2',
          200: '#F3EDE3',
          300: '#E8DFD0',
        },
        charcoal: {
          900: '#2D2424',
          700: '#4A3D3D',
          500: '#7A6B6B',
          300: '#B8A9A9',
        },
        sage: {
          500: '#8FA68E',
          300: '#C4D4C2',
        },
      },
      borderRadius: {
        'xl-soft': '36px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(61, 26, 53, 0.04)',
        'soft-md': '0 8px 24px rgba(61, 26, 53, 0.08)',
        'soft-lg': '0 20px 50px rgba(61, 26, 53, 0.12)',
        'soft-xl': '0 30px 80px rgba(61, 26, 53, 0.18)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'pulse-ring': 'pulseRing 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4), 0 0 0 0 rgba(37, 211, 102, 0.4)' },
          '50%': { boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4), 0 0 0 15px rgba(37, 211, 102, 0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
