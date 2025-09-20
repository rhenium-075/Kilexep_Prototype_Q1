/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'logo-change': {
          '0%': { transform: 'translateX(0)', opacity: '1', color: '#ffffff' },
          '50%': { transform: 'translateX(-100%)', opacity: '0', color: '#ffffff' },
          '51%': { transform: 'translateX(100%)', opacity: '0', color: '#f97316' },
          '100%': { transform: 'translateX(0)', opacity: '1', color: '#f97316' },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)'
          },
          '33%': {
            transform: 'translateY(-20px) rotate(5deg)'
          },
          '66%': {
            transform: 'translateY(-10px) rotate(-5deg)'
          }
        }
      },
      animation: {
        'logo-change': 'logo-change 0.6s ease-in-out',
        float: 'float 6s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
