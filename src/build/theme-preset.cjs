const config = require('tailwindcss/defaultConfig')
const colors = require('tailwindcss/colors')

function createBrandColor(type, colors) {
  if (!colors) return {}
  return {
    [`b-${type}`]: {
      DEFAULT: colors[5],
      hover: colors[4],
      active: colors[6],
      disabled: colors[2],
      background: colors[0],
    },
  }
}

function createStepCssVarColors(name, count = 10) {
  return new Array(count).fill().map((_, index) => `var(--color-${name}-${index + 1})`)
}

const baseColors = ['blue', 'orange', 'green', 'red', 'pink', 'cyan', 'gray'].reduce((map, name) => {
  map[name] = createStepCssVarColors(name)
  return map
}, {})

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,

      ...Object.entries(baseColors).reduce((conf, [name, list]) => {
        conf[name] = list.reduce((map, color, index) => {
          map[(index + 1) * 100] = color
          return map
        }, {})
        return conf
      }, {}),

      'b-primary': {
        DEFAULT: 'var(--color-b-primary)',
        hover: 'var(--color-b-primary-hover)',
        active: 'var(--color-b-primary-active)',
        disabled: 'var(--color-b-primary-disabled)',
        background: 'var(--color-b-primary-background)',
      },
      ...createBrandColor('success', baseColors.green),
      ...createBrandColor('warn', baseColors.orange),
      ...createBrandColor('danger', baseColors.red),
      ...createBrandColor('link', baseColors.blue),
    },
    // 规则：以4px为倍数递进
    spacing: new Array(21).fill(null).reduce((conf, _, index) => {
      conf[index] = `${index * 4}px`
      return conf
    }, {}),
    fontSize: [
      { name: 'xs', size: 10 },
      { name: 'sm', size: 12 },
      { name: 'msm', size: 13 },
      { name: 'base', size: 14 },
      { name: 'h6', size: 16 },
      { name: 'h5', size: 20 },
      { name: 'h4', size: 24 },
      { name: 'h3', size: 36 },
      { name: 'h2', size: 48 },
      { name: 'h1', size: 56 },
    ].reduce((sizes, o) => {
      sizes[o.name] = [`${o.size}px`, { lineHeight: `${Math.round(o.size * 1.5)}px` }]
      return sizes
    }, {}),
    boxShadow: {
      sm: ' 0px 2px 5px 0px rgba(0, 0, 0, 0.1)',
      md: '0px 4px 10px 0px rgba(0, 0, 0, 0.1)',
      lg: '0px 8px 20px 0px rgba(0, 0, 0, 0.1)',
    },
    borderRadius: {
      xs: '2px',
      sm: '4px',
      md: '6px',
      full: config.theme.borderRadius.full,
      none: config.theme.borderRadius.none,
    },

    // 继承（原有的不会删除）
    extend: {
      textColor: {
        primary: baseColors.gray[9],
        regular: baseColors.gray[7],
        secondary: baseColors.gray[5],
        disabled: baseColors.gray[3],
      },
      borderColor: {
        light: baseColors.gray[1],
        DEFAULT: baseColors.gray[2],
        regular: baseColors.gray[2],
        dark: baseColors.gray[3],
        darker: baseColors.gray[5],
      },
      backgroundColor: {
        normal: 'var(--color-bg-normal)',
      },
    },
  },
}
