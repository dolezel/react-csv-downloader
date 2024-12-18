import importPlugin from 'eslint-plugin-import'
import prettierPluginRecomended from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import sonarjsPlugin from 'eslint-plugin-sonarjs'
import globals from 'globals'
import eslintJs from '@eslint/js'
import eslintTs from 'typescript-eslint' // eslint-disable-line import/no-unresolved

const config = eslintTs.config(
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
  sonarjsPlugin.configs.recommended,
  prettierPluginRecomended,
  {
    ignores: ['node_modules/', 'dist/'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.mocha,
        ...globals.es2021,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  }
)

export default config
