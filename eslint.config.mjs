import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import { fixupConfigRules } from '@eslint/compat'
import reactCompiler from 'eslint-plugin-react-compiler'

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-compiler': reactCompiler,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['.next/', 'out'],
  },
  {
    rules: {
      'react-compiler/react-compiler': 'error',
      'react/react-in-jsx-scope': 'off',
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-var': 'warn',
      'prefer-const': 'warn',
      'indent-legacy': ['error',
        2],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-style': ['error', 'last'],
      'array-bracket-newline': ['error', 'consistent'],
      'object-curly-newline': ['error',
        {
          multiline: true, consistent: true,
        }],
      'object-curly-spacing': ['error', 'always'],
      'space-before-function-paren': ['error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        }],

      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',

      'react/prop-types': 'off',
      'space-in-parens': ['error', 'never'],
      'quote-props': ['error', 'as-needed'],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always', prev: '*', next: 'function',
        },
        {
          blankLine: 'always', prev: 'function', next: '*',
        },
      ],
    },
  },
]
