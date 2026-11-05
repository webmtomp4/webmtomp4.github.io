/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        palette: {
          midnight: '#092328',
          pine: '#12544F',
          emerald: '#2A835F',
          mint: '#8BBB92',
          alabaster: '#F4F9F5',
          darkSurface: '#0D3138',
          lightPill: '#E3F1E6',
        },
        theme: {
          bg: 'var(--bg-primary)',
          surface: 'var(--bg-surface-card)',
          workspace: 'var(--workspace-box-bg)',
          action: 'var(--primary-action-button)',
          actionHover: 'var(--primary-action-hover)',
          actionText: 'var(--primary-action-text)',
          accent: 'var(--secondary-accent-surface)',
          pill: 'var(--highlight-pill-badge)',
          border: 'var(--border-color)',
          text: 'var(--text-primary)',
          textSecondary: 'var(--text-secondary)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        workspace: '0 24px 60px -15px rgba(9, 35, 40, 0.14), 0 0 0 1px var(--border-color)',
        emeraldGlow: '0 10px 30px -5px rgba(42, 131, 95, 0.45)',
        pineGlow: '0 10px 28px -4px rgba(18, 84, 79, 0.55)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseBorder: {
          '0%, 100%': { borderColor: 'var(--border-color)' },
          '50%': { borderColor: '#2A835F' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        float: 'floatSlow 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
