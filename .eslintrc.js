module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint', 'unicorn', 'promise'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-void': 'off',
    '@typescript-eslint/require-await': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-module': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
  ],
};
