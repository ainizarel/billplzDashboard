/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}"  // ✅ important!
    ],
    theme: {
        extend: {
          colors: {
            menuBlue: '#F4F8FF',
            mainBlue: '#F4F8FF',
            hoverBlue:'#D8E8FF',
          },
        },
      },
    plugins: [],
  }
  