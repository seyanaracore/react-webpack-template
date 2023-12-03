// @ts-check
const path = require('path');
const { addDeepPattern, readJson } = require('./config/helpers');

const OFF = 'off';
const ERROR = 'error';
const WARN = 'warn';
const READONLY = 'readonly';
const APP_TS_CONFIG_PATH = path.resolve(__dirname, 'tsconfig.app.json');
const NODE_TS_CONFIG_PATH = path.resolve(__dirname, 'tsconfig.node.json');
/** @type {{include: string[]}} */
const tsConfigNode = readJson(NODE_TS_CONFIG_PATH);
const tsNodeIncludes = addDeepPattern(tsConfigNode.include);

/** @typedef {import("eslint").Linter.BaseConfig} EslintConfig */

/** @type {import('config/build/types').EslintGlobal} */
const globals = {
  APP_MODE: READONLY,
  BASE_URL: READONLY,
};

/** @type {EslintConfig} */
const config = {
  env: {
    browser: true,
    es2024: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/recommended',
    'prettier',
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict-type-checked.ts
    'plugin:@typescript-eslint/strict-type-checked',
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: APP_TS_CONFIG_PATH,
  },
  overrides: [
    {
      files: tsNodeIncludes,
      env: {
        node: true,
      },
      parserOptions: {
        project: NODE_TS_CONFIG_PATH,
      },
      rules: {
        'import/no-extraneous-dependencies': OFF,
        '@typescript-eslint/no-var-requires': OFF,
      },
    },
  ],
  plugins: ['react', 'prettier', 'import', '@typescript-eslint', 'react-refresh'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.app.json',
      },
    },
  },
  globals,
  rules: {
    '@typescript-eslint/prefer-reduce-type-parameter': OFF,
    '@typescript-eslint/no-unsafe-member-access': OFF,
    '@typescript-eslint/no-non-null-assertion': OFF,
    '@typescript-eslint/consistent-type-definitions': [ERROR, 'type'],
    'react-refresh/only-export-components': WARN,
    'prettier/prettier': ERROR,
    'react/react-in-jsx-scope': OFF,
    'react/button-has-type': OFF,
    'import/prefer-default-export': OFF,
    '@typescript-eslint/consistent-type-imports': ERROR,
    'import/order': [
      ERROR,
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'internal',
          'object',
          'unknown',
          'type',
        ],
      },
    ],
    'padding-line-between-statements': [
      ERROR,
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: '*',
      },
      {
        blankLine: 'never',
        prev: ['singleline-const', 'singleline-let'],
        next: ['singleline-const', 'singleline-let'],
      },
      {
        blankLine: 'always',
        prev: ['multiline-const', 'multiline-let'],
        next: ['multiline-const', 'multiline-let'],
      },
      {
        blankLine: 'always',
        prev: ['cjs-import'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['cjs-import'],
        next: ['cjs-import'],
      },
    ],
  },
};

module.exports = config;
