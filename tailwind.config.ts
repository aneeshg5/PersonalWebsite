import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#06c0f9',
        'accent-cyan': '#00C9FF',
        'accent-purple': '#A78BFA',
        'accent-green': '#10B981',
        'accent-orange': '#F59E0B',
        'accent-yellow': '#FBBF24',
        'accent-rose': '#FB7185',
        'line-dark': '#1F2633',
        'pill-dark': '#1F2633',
        'card-bg': '#151922',
        'background-dark': '#0B0F1A',
      },
      fontFamily: {
        'display': ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        'mono': ['var(--font-space-mono)', 'Space Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'cursor-blink': {
          '0%, 49%': { backgroundColor: 'rgba(255,255,255,0.9)', color: '#0B0F1A' },
          '50%, 100%': { backgroundColor: 'transparent', color: 'rgba(255,255,255,1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1.2s step-end infinite',
        'cursor-blink': 'cursor-blink 1.2s step-end infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
