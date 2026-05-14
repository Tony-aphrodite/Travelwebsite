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
        // Primary brand — Expedia-style deep navy → vibrant blue
        plum: {
          900: '#0A1E3D',
          800: '#0F2C5C',
          700: '#1668E3',
          600: '#2D7FF0',
          500: '#4D94F5',
        },
        // Deals / accent — vibrant coral/red (was soft pink)
        rose: {
          900: '#B81E3F',
          700: '#E63956',
          500: '#FF6B7E',
          300: '#FFD0D6',
          100: '#FFF0F2',
        },
        // CTA highlight — Expedia signature yellow
        gold: {
          700: '#E6A800',
          600: '#FFC72C',
          500: '#FFD55A',
          300: '#FFE699',
        },
        // Clean backgrounds with cool tint
        ivory: {
          50: '#FFFFFF',
          100: '#F7F9FC',
          200: '#EEF2F8',
          300: '#DCE3EC',
        },
        // Crisp text colors
        charcoal: {
          900: '#0F1B2D',
          700: '#2E3A4D',
          500: '#6B7280',
          300: '#9CA3AF',
        },
        // Success / available — vibrant green
        sage: {
          500: '#00A65A',
          300: '#7ED9A8',
        },
      },
      borderRadius: {
        'xl-soft': '36px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(15, 27, 45, 0.05)',
        'soft-md': '0 8px 24px rgba(15, 27, 45, 0.10)',
        'soft-lg': '0 20px 50px rgba(15, 27, 45, 0.14)',
        'soft-xl': '0 30px 80px rgba(22, 104, 227, 0.20)',
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
