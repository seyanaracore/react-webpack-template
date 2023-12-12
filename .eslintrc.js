// @ts-check
/* eslint-disable @typescript-eslint/no-unused-vars */
const { resolveExtensions } = require('./config/build/resolveExtensions');
const { tsConfigAliases } = require('./config/build/alises');

/** @typedef {import("eslint").Linter.BaseConfig} Config */

const OFF = 'off';
const ERROR = 'error';
const WARN = 'warn';
const NEVER = 'never';
const READONLY = 'readonly';

/** @type {import('config/build/types').EslintGlobal} */
const globals = {
  APP_MODE: READONLY,
};

/** @type {Config} */
const config = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['.eslintrc.js', '.prettierrc.js', './config/build/**'],
      env: {
        node: true,
      },
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  ],
  plugins: ['react', 'prettier', 'import', 'react-refresh'],
  settings: {
    'import/resolver': {
      alias: {
        map: tsConfigAliases,
        extensions: resolveExtensions,
      },
    },
  },
  globals,
  rules: {
    'react-refresh/only-export-components': WARN,
    'prettier/prettier': ERROR,
    'react/react-in-jsx-scope': OFF,
    'react/button-has-type': OFF,
    'import/prefer-default-export': OFF,
    '@typescript-eslint/consistent-type-imports': ERROR,
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
