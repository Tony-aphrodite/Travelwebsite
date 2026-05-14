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
        // Primary brand — deep editorial navy ink (matches "enamoran" reference)
        plum: {
          900: '#0B1535',
          800: '#131F45',
          700: '#1A2954',
          600: '#2A3B6C',
          500: '#4D6191',
          100: '#DDE0EB',
        },
        // Warm contrast — terracotta / sale price (harmonizes with cream)
        rose: {
          900: '#7E2A22',
          700: '#B0463A',
          500: '#D87761',
          400: '#E4977E',
          300: '#F0B9AB',
          100: '#FBE9E3',
        },
        // Aged-amber complement to cream
        gold: {
          700: '#A07025',
          600: '#C49435',
          500: '#DCB060',
          400: '#E2BF7C',
          300: '#EAD09A',
          100: '#F5E6C5',
        },
        // Cream backgrounds (parchment palette)
        ivory: {
          50: '#FBF4E0',
          100: '#F0DEB4',
          200: '#E5CF98',
          300: '#D4BB7A',
        },
        // Text on cream — deep navy keeps strong contrast
        charcoal: {
          900: '#0B1535',
          700: '#2C3856',
          500: '#6B7280',
          300: '#9CA3AF',
        },
        // Subtle success / available
        sage: {
          500: '#5C8C66',
          400: '#84B08B',
          300: '#B0CBA4',
          100: '#DDEBD7',
        },
      },
      borderRadius: {
        'xl-soft': '36px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(11, 21, 53, 0.05)',
        'soft-md': '0 8px 24px rgba(11, 21, 53, 0.10)',
        'soft-lg': '0 20px 50px rgba(11, 21, 53, 0.14)',
        'soft-xl': '0 30px 80px rgba(11, 21, 53, 0.20)',
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
