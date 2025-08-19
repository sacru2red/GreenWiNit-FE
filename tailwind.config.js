/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        short: { raw: '(max-height: 811px)' },
        ['min-short']: { raw: '(max-height: 479px)' },
      },
    },
  },
}
