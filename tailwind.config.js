const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.cyan,
      },
      height: {
        'screen/2': '50vh',
      },
      spacing: {
        '10vh': '10vh',
      },
    },
  },
  plugins: [],
}
