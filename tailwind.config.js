/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'indigo-dye': '#0F4863',
        'anti-flash-white': '#EEEEEE',
        'eerie-black': '#1A1A1A',
        'white-2': '#FCFDFD',
        'carolina-blue': '#6CB5D6'
      }
    },
  },
  plugins: [],
}

