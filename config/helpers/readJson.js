// @ts-check
const fs = require('fs');
const json5 = require('json5');

/**
 *
 * @param {string} path
 * @returns {any}
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const readJson = (path) => json5.parse(fs.readFileSync(path, { encoding: 'utf8' }));

module.exports = readJson;
