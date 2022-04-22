module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'sonarjs'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
}
