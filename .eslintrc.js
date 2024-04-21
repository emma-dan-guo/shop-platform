module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-empty': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
}
