/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FDFBF7",
          100: "#FCEFD2",
          200: "#F4E3BA",
          300: "#E5C77A",
          400: "#D4B35D",
          500: "#C59E47",
          600: "#A88232",
          700: "#997327",
          800: "#7A5817",
          900: "#4F3503",
          950: "#382402",
        },
        royal: {
          800: "#1E293B",
          900: "#0F172A",
          950: "#070C16",
        },
        midnight: {
          950: "#070C16",
          900: "#0B1220",
          850: "#0D1627",
          800: "#0E1626",
          750: "#111B2E",
          700: "#141E32",
          650: "#16233B",
          600: "#18243A",
          500: "#1E2F4D",
          400: "#22304A",
          300: "#253552",
        },
        alabaster: {
          50: "#FCFAF6",
          100: "#FAF6EE",
          200: "#FAF4E8",
          300: "#EFE4CF",
          400: "#E6DDD0",
          500: "#DEC89E",
          600: "#C5B085",
        },
        ivory: {
          50: "#FAF8F5",
          100: "#F5F2EB",
          200: "#EAE5D9",
          300: "#DCD4C4",
        },
      },
      fontFamily: {
        title: ["var(--font-cinzel)", "var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        script: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 16px 40px rgba(10, 14, 23, 0.35)",
        card: "0 8px 24px rgba(122, 104, 67, 0.08)",
        seal: "0 6px 20px rgba(212, 175, 55, 0.45)",
      },
    },
  },
  plugins: [],
};
