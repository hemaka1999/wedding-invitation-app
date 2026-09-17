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
          100: "#FBF7EF",
          200: "#F5ECDA",
          300: "#EBD9B6",
          400: "#DFC086",
          500: "#D4AF37",
          600: "#AA8825",
          700: "#83661A",
          800: "#644D18",
          900: "#4D3A15",
        },
        royal: {
          800: "#1E293B",
          900: "#0F172A",
          950: "#090D16",
        },
        ivory: {
          50: "#FAF8F5",
          100: "#F5F2EB",
          200: "#EAE5D9",
          300: "#DCD4C4",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        body: ["var(--font-inter)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
