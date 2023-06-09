/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
    theme: {
        colors: {
            'primary': '#1446A0',
            'secondary': '#9C48A2',
            'other': '#E6568C',
             
        },
    extend: {},
  },
  plugins: [],
}
