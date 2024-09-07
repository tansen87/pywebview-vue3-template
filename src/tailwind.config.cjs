/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{html,vue,jsx,js,ts,tsx}', 'index.html'],
  darkMode: 'class',
  plugins: [
    '@tailwindcss/aspect-ratio',
  ],
  corePlugins: {
    preflight: false,
  },
  presets: [require('./build/theme-preset.cjs')],
}
