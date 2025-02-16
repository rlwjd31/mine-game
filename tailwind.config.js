/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-primary": "#673AB7",
        "purple-secondary": "#F0EBF8",
        card: "#FFFFFF",
        "blue-primary": "#4285f4",
        "red-primary": "#C23729",
      },
      backgroundImage: {
        "dot-pattern": "radial-gradient(circle, black 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
