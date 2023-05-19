module.exports = {
  env: { browser: true, es2020: true,"jest/globals": true },
  extends: [
  'eslint:recommended',
  'plugin:react/recommended',
  "plugin:jest/recommended",
  'plugin:react/jsx-runtime',
  'plugin:react-hooks/recommended',
  'plugin:prettier/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module',ecmaFeatures: {
  jsx: true,
  },
  },
  
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh',"rect","jest"],
  rules: {
  'react-refresh/only-export-components': 'warn',
  },
  }
