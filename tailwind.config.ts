import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nothing-red': '#FF0000',
        'nothing-red-dim': '#CC0000',
        'bg-primary': '#000000',
        'bg-card': '#0A0A0A',
        'bg-elevated': '#141414',
        'border-subtle': '#1F1F1F',
        'border-emphasis': '#2F2F2F',
        'text-primary': '#FFFFFF',
        'text-secondary': '#808080',
        'text-tertiary': '#4A4A4A',
      },
      fontFamily: {
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        code: ['Fira Code', 'Cascadia Code', 'monospace'],
      },
      animation: {
        glitch: 'glitch 200ms ease-out',
        shimmer: 'shimmer 1.5s infinite',
        'pulse-dot': 'pulse-dot 2s infinite',
        fadeSlideUp: 'fadeSlideUp 400ms ease-out both',
        slideUp: 'slideUp 300ms ease-out',
        slideIn: 'slideIn 300ms ease-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
          '20%': { clipPath: 'inset(40% 0 40% 0)', transform: 'translate(-2px, 2px)' },
          '40%': { clipPath: 'inset(60% 0 20% 0)', transform: 'translate(2px, -2px)' },
          '60%': { clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-2px, -2px)' },
          '80%': { clipPath: 'inset(80% 0 10% 0)', transform: 'translate(2px, 2px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { transform: 'translateY(100px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
