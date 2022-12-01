module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './src/__tests__/tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-underscore-dangle': 'off',
    'max-len': ['error', { code: 150 }],
    'react/require-default-props': 0,
    'react/prop-types': 0,
    'no-void': 0, // handled by @typescript-eslint
  },
};
