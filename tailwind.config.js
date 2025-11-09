/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ccw6: "#fef3c7",
        ccw7: "#d1fae5",
        ccw8: "#fce7f3",
        ccw9: "#fef3c7",
        ccw10: "#dbeafe",
        grade1: "#86efac",
        grade2: "#6ee7b7",
        "division-ms": "#dcfce7",
        "division-hs": "#e0f2fe",
      },
    },
  },
  plugins: [],
};
