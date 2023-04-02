/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js, jsx,ts,tsx}"],
  theme: {
    minWidth: {
      '2/5': '40%'
    },
    extend: {
      fontFamily:{
      display:["Open Sans"]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
