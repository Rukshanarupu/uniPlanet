/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'vibes': ['Great Vibes', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
        'forum': ['Forum', 'cursive']

      },
      colors: {
        'primary': 'rgb(244 114 182)',
        'secondary': 'rgb(45 212 191)',
      }
    },
  },
  plugins: [require("daisyui")],
}

