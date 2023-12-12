// @ts-check
const path = require('path');

/** @type {import('config/build/types').BuildOptions['paths']} */
const paths = {
  src: path.resolve(__dirname, 'src'),
  entry: path.resolve(__dirname, 'src'),
  public: path.resolve(__dirname, 'public'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  dist: path.resolve(__dirname, 'dist'),
};

module.exports = {
  paths,
};
