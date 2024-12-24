import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fill: {
          '0%': { width: '0%', opacity: '0.8' },
          '100%': { width: '100%', opacity: '1' },
        }
      },
      animation: {
        'fill': 'fill 6s ease-in-out forwards',
        'shine': 'shine 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;
