/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Core System Colors */
        background: 'var(--color-background)', /* gray-50 */
        foreground: 'var(--color-foreground)', /* slate-700 */
        border: 'var(--color-border)', /* gray-200 */
        input: 'var(--color-input)', /* white */
        ring: 'var(--color-ring)', /* green-600 */
        
        /* Card & Surface Colors */
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)' /* slate-700 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)' /* slate-700 */
        },
        
        /* Muted Colors */
        muted: {
          DEFAULT: 'var(--color-muted)', /* slate-50 */
          foreground: 'var(--color-muted-foreground)' /* gray-500 */
        },
        
        /* Brand Primary Colors */
        primary: {
          DEFAULT: 'var(--color-primary)', /* green-600 */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        
        /* Brand Secondary Colors */
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* blue-500 */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        
        /* Accent Colors */
        accent: {
          DEFAULT: 'var(--color-accent)', /* orange-400 */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        
        /* State Colors */
        success: {
          DEFAULT: 'var(--color-success)', /* green-500 */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* orange-600 */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 */
          foreground: 'var(--color-error-foreground)' /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500 */
          foreground: 'var(--color-destructive-foreground)' /* white */
        },
        
        /* Extended Botanical Palette */
        bloom: {
          50: '#E8F5E8', /* light-green-50 */
          100: '#C8E6C9', /* light-green-100 */
          200: '#A5D6A7', /* light-green-200 */
          300: '#81C784', /* light-green-300 */
          400: '#66BB6A', /* light-green-400 */
          500: '#2ECC71', /* green-500 */
          600: '#27AE60', /* green-600 */
          700: '#2E7D32', /* green-700 */
          800: '#1B5E20', /* green-800 */
          900: '#0D4F1C', /* green-900 */
        },
        sky: {
          50: '#E3F2FD', /* blue-50 */
          100: '#BBDEFB', /* blue-100 */
          200: '#90CAF9', /* blue-200 */
          300: '#64B5F6', /* blue-300 */
          400: '#42A5F5', /* blue-400 */
          500: '#3498DB', /* blue-500 */
          600: '#2980B9', /* blue-600 */
          700: '#1976D2', /* blue-700 */
          800: '#1565C0', /* blue-800 */
          900: '#0D47A1', /* blue-900 */
        },
        sunset: {
          50: '#FFF4E6', /* orange-50 */
          100: '#FFE0B2', /* orange-100 */
          200: '#FFCC80', /* orange-200 */
          300: '#FFB74D', /* orange-300 */
          400: '#FFA726', /* orange-400 */
          500: '#F39C12', /* orange-500 */
          600: '#E67E22', /* orange-600 */
          700: '#D68910', /* orange-700 */
          800: '#B7950B', /* orange-800 */
          900: '#9A7D0A', /* orange-900 */
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['clamp(1.875rem, 4vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subsection': ['clamp(1.25rem, 3vw, 1.5rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem', /* 72px */
        '88': '22rem', /* 352px */
        '128': '32rem', /* 512px */
        '144': '36rem', /* 576px */
      },
      borderRadius: {
        'organic': 'var(--radius-organic)', /* 8px */
        'card': 'var(--radius-card)', /* 12px */
        'button': 'var(--radius-button)', /* 6px */
      },
      boxShadow: {
        'organic': 'var(--shadow-organic)',
        'bloom': '0 4px 20px rgba(46, 204, 113, 0.2), 0 2px 8px rgba(46, 204, 113, 0.1)',
        'card': 'var(--shadow-card)',
        'modal': 'var(--shadow-modal)',
        'achievement': '0 0 20px rgba(243, 156, 18, 0.4), 0 0 40px rgba(243, 156, 18, 0.2)',
      },
      animation: {
        'bloom': 'bloom 2.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'growth': 'growth 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
        'pulse-organic': 'pulse-organic 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'particle-fade': 'particle-fade 800ms ease-out',
        'achievement-pulse': 'achievement-pulse 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-gentle': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        bloom: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.05) rotate(1deg)' },
          '50%': { transform: 'scale(1.1) rotate(0deg)' },
          '75%': { transform: 'scale(1.05) rotate(-1deg)' },
        },
        growth: {
          '0%': { 
            transform: 'translateY(20px) scale(0.95)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0) scale(1)', 
            opacity: '1' 
          },
        },
        'pulse-organic': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'particle-fade': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.5)' },
        },
        'achievement-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
      },
      backdropBlur: {
        'organic': '12px',
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'bloom': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'growth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}