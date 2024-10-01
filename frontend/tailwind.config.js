import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // removed so that the nextui theme can be used?? otherwise the activeTab in the landingpage turns grey and all colors change
        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
        // secondary: {
        //   DEFAULT: 'hsl(var(--secondary))',
        //   foreground: 'hsl(var(--secondary-foreground))',
        // },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'spin-around': {
          '0%': { transform: 'translateZ(0) rotate(0)' },
          '15%, 35%': { transform: 'translateZ(0) rotate(90deg)' },
          '65%, 85%': { transform: 'translateZ(0) rotate(270deg)' },
          '100%': { transform: 'translateZ(0) rotate(360deg)' },
        },
        'slide': {
          to: { transform: 'translate(calc(100cqw - 100%), 0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
        'slide': 'slide var(--speed) ease-in-out infinite alternate',
      },
      backgroundImage: {
        'gradient-custom':
          'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.bg-hfinance-gradient': {
          'backgroundImage':
            'linear-gradient(to right, var(--tw-gradient-stops))',
          '--tw-gradient-from': theme('colors.purple.400'),
          '--tw-gradient-via': theme('colors.pink.500'),
          '--tw-gradient-to': theme('colors.red.500'),
        },
        '.text-hfinance-gradient': {
          'background-image':
            'linear-gradient(to right, var(--tw-gradient-stops))',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
          '--tw-gradient-from': theme('colors.purple.400'),
          '--tw-gradient-via': theme('colors.pink.500'),
          '--tw-gradient-to': theme('colors.red.500'),
        },
      }
      addUtilities(newUtilities)
    },
    require('tailwindcss-animate'),
    nextui(),
  ],
}
