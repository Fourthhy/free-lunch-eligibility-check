/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        'SourceSerif': ['"Source Serif 4"', 'serif'], // Use kebab-case
        'Poppins': ['Poppins', 'sans-serif'],
        'Inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'bg-overlay': '#1F3463', // Wrap in quotes for kebab-case
      },
    },
  },
  plugins: [],
}

