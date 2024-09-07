import { javascript, stylistic, typescript, vue, } from '@shoppingzh/eslint-config'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      'dist/**'
    ],
  },
  ...javascript(),
  ...stylistic({
    overrides: {
      'comma-dangle': [2, { arrays: 'ignore', functions: 'ignore', objects: 'always', imports: 'always', exports: 'ignore', }],
    },
  }),
  ...typescript({
    files: [
      '**/*.?([cm])[jt]s?(x)',
      '**/*.vue'
    ],
    overrides: {
      '@typescript-eslint/no-explicit-any': [0], // 谨慎
    },
  }),
  ...vue({
    typescript: true,
    overrides: {
      'vue/multi-word-component-names': [0],
    },
  }),
  {
    files: [
      '**/*.cjs',
    ],
    rules: {
      '@typescript-eslint/no-require-imports': [0],
    },
  },
]
