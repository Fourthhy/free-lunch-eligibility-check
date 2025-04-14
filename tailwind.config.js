import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react/class-list.json"
  ],

  theme: {
    extend: {
      fontFamily: {
        'SourceSerif': ['"Source Serif 4"', 'serif'], // Use kebab-case
        'Poppins': ['Poppins', 'sans-serif'],
        'Inter': ['Inter', 'sans-serif'],
        'Tolkiens': ['Tolkiens', 'serif']
      },
      colors: {
        'bg-overlay': '#1F3463', // Wrap in quotes for kebab-case
      },
    },
  },
  plugins: [flowbiteReact],
}