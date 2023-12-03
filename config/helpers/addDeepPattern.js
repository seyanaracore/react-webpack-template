// @ts-check
const fs = require('fs');

/**
 * Добавить
 * @param {string[]} list
 * @returns string[]
 */
const addDeepPattern = (list) =>
  list.map((path) => (fs.statSync(path).isDirectory() ? `${path}/**` : path));

module.exports = addDeepPattern;
