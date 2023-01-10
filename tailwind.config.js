/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/components/**/*.tsx',
    './src/hooks/**/*.tsx',
    './pages/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        amber: colors.amber,
        black: colors.black,
        blue: colors.blue,
        cyan: colors.cyan,
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        neutral: colors.neutral,
        slate: colors.slate,
        gray: colors.gray,
        stone: colors.stone,
        green: colors.green,
        indigo: colors.indigo,
        lime: colors.lime,
        orange: colors.orange,
        pink: colors.pink,
        purple: colors.purple,
        red: colors.red,
        rose: colors.rose,
        sky: colors.sky,
        teal: colors.teal,
        violet: colors.violet,
        yellow: colors.amber,
        white: colors.white,
      },
    },
  },
};
