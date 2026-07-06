/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Color Palette từ Design System Hissu.dev ───────────────────
      colors: {
        // Primary Grounds
        'ds-white':        '#FFFFFF',
        'ds-off-white':    '#FAFAFA',
        'ds-soft-gray':    '#E4E4E7',

        // Accent
        'ds-lime':         '#B8D927',
        'ds-lime-hover':   '#A8C91E',
        'ds-lime-active':  '#98B91A',
        'ds-lime-text':    '#272D1F',  // text trên nền lime (WCAG compliant)
        'ds-electric':     '#0000EE',
        'ds-electric-hover':'#1D4ED8',
        'ds-electric-active':'#1E40AF',
        'ds-bright-blue':  '#3B82F6',
        'ds-deep-blue':    '#1D4ED8',

        // Interactive States
        'ds-blue-accent':  '#1E40AF',
        'ds-medium-slate': '#374151',
        'ds-light-slate':  '#71717A',

        // Neutral / Typography
        'ds-near-black':   '#09090B',
        'ds-abs-black':    '#000000',
        'ds-stone-black':  '#0C0A09',
        'ds-dark-gray':    '#A1A1AA',
        'ds-medium-gray':  '#D1D5DB',
        'ds-cool-gray':    '#CBD5E1',

        // Surface & Borders
        'ds-light-border': '#E4E4E7',
        'ds-neutral-surf': '#FAFAFA',
        'ds-contrast-surf':'#18181B',

        // Semantic
        'ds-success':      '#16A34A',
        'ds-warning':      '#EAB308',
        'ds-error':        '#EF4444',
      },

      // ─── Font Families ───────────────────────────────────────────────
      fontFamily: {
        'google-sans': ['"Google Sans"', '"Google Sans Flex"', 'sans-serif'],
        'inter':       ['Inter', 'sans-serif'],
        'sans':        ['Inter', '"Google Sans"', 'sans-serif'],
      },

      // ─── Font Sizes theo Design System ──────────────────────────────
      fontSize: {
        'ds-display': ['54px', { lineHeight: '54px', fontWeight: '600' }],
        'ds-h2':      ['48px', { lineHeight: '58px', fontWeight: '500' }],
        'ds-h3':      ['16px', { lineHeight: '16px', fontWeight: '400' }],
        'ds-h6':      ['20px', { lineHeight: '28px', fontWeight: '500' }],
        'ds-body-lg': ['16px', { lineHeight: '16px', fontWeight: '600' }],
        'ds-body':    ['14px', { lineHeight: '14px', fontWeight: '900' }],
        'ds-body-sm': ['14px', { lineHeight: '14px', fontWeight: '500' }],
        'ds-link':    ['12px', { lineHeight: 'normal', fontWeight: '400' }],
        'ds-caption': ['12px', { lineHeight: 'normal', fontWeight: '400' }],
        'ds-code':    ['13px', { lineHeight: '20px', fontWeight: '400' }],
      },

      // ─── Border Radius theo Design System ───────────────────────────
      borderRadius: {
        'ds-none':   '0px',
        'ds-btn':    '8px',
        'ds-card':   '12px',
        'ds-pill':   '23px',
        'ds-circle': '64px',
      },

      // ─── Box Shadow (Elevation) theo Design System ───────────────────
      boxShadow: {
        'ds-flat':  'none',
        'ds-raised':'0px 4px 12px rgba(9, 9, 11, 0.04)',
        'ds-modal': '0px 12px 32px rgba(9, 9, 11, 0.08)',
        'ds-float': '0px 20px 48px rgba(9, 9, 11, 0.10)',
        'ds-max':   '0px 32px 64px rgba(9, 9, 11, 0.12)',
        // Dark mode equivalents (stronger for visibility on dark bg)
        'ds-dark-raised':'0px 4px 12px rgba(0, 0, 0, 0.25)',
        'ds-dark-modal': '0px 12px 32px rgba(0, 0, 0, 0.40)',
        'ds-dark-float': '0px 20px 48px rgba(0, 0, 0, 0.50)',
      },

      // ─── Max Width theo Layout Principles ────────────────────────────
      maxWidth: {
        'ds-content': '1200px',
        'ds-sidebar': '320px',
        'ds-read':    '1024px',  // max-w-5xl — tối ưu readability cho wiki/blog
      },

      // ─── Spacing thêm (base-4 grid) ──────────────────────────────────
      spacing: {
        '18': '72px',
        '22': '88px',
        '25': '100px',
        '30': '120px',
        '32': '128px',
      },

      // ─── Animations ──────────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in':       'fade-in 0.4s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.35s ease-out forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
