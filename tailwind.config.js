/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        ink: '#0f172a',
        paper: '#f8fafc',
        accent: '#a78bfa',
        muted: '#94a3b8',
        grid: '#152238',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'blink': 'blink 1.2s step-end infinite',
        'slide-in': 'slideIn 0.5s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        datatheme: {
          'primary': '#a78bfa',
          'secondary': '#f9a8d4',
          'accent': '#d8b4fe',
          'neutral': '#111827',
          'base-100': '#0f172a',
          'base-200': '#111827',
          'base-300': '#17223a',
          'base-content': '#e2e8f0',
          'info': '#8b5cf6',
          'success': '#34d399',
          'warning': '#fbbf24',
          'error': '#f472b6',
        },
      },
      {
        'datatheme-light': {
          'primary': '#8b5cf6',
          'secondary': '#db2777',
          'accent': '#d946ef',
          'neutral': '#e2e8f0',
          'base-100': '#f8fafc',
          'base-200': '#eef2ff',
          'base-300': '#e0e7ff',
          'base-content': '#0f172a',
          'info': '#2563eb',
          'success': '#16a34a',
          'warning': '#f59e0b',
          'error': '#be185d',
        },
      },
    ],
  },
}
