/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx, tsx}",
    "./pages/**/*.{html,js,jsx, tsx}",
    "./components/**/*.{html,js,jsx,tsx}",
    "./sections/**/*.{html,js,jsx, tsx}",
],
  theme: {
    extend: {
      width: {
        '42': '10.5rem',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'spin-delay': 'spin 6s linear infinite -3s',

      }
    },
  },
  plugins: [],
}

