/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDF8EC', 100: '#F9EBC6', 200: '#F2D78E', 300: '#E9BF56',
          400: '#DDA82F', 500: '#C9971F', DEFAULT: '#D4AF37',
          600: '#B08A1F', 700: '#8A6B18', 800: '#664F13', 900: '#453510'
        },
        ink: {
          950: '#050505', 900: '#0A0A0A', 850: '#0F0F0F', 800: '#141414',
          700: '#1C1C1C', 600: '#262626', 500: '#333333'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif']
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F2D78E 0%, #D4AF37 45%, #8A6B18 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.15), transparent 60%)'
      },
      boxShadow: {
        gold: '0 0 40px rgba(212,175,55,0.25)',
        'gold-sm': '0 0 20px rgba(212,175,55,0.15)',
        glass: '0 8px 32px rgba(0,0,0,0.45)'
      },
      backdropBlur: { xs: '2px' },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: []
}
