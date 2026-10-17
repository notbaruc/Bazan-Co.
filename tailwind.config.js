/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07090f',
        surface: '#0e121b',
        elevated: '#151a26',
        line: 'rgb(255 255 255 / 0.08)',
        'line-strong': 'rgb(255 255 255 / 0.14)',
        ink: {
          DEFAULT: '#f3f1ea',
          secondary: '#a9aebb',
          muted: '#878d9c',
          inverse: '#07090f',
        },
        accent: {
          DEFAULT: '#d9b45a',
          hi: '#edd08a',
          lo: '#b8932f',
        },
        support: '#5b7bb5',
        whatsapp: '#25d366',
        success: '#4ade80',
        danger: '#f87171',
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      maxWidth: {
        container: 'var(--max-width)',
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
        card: 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
};
