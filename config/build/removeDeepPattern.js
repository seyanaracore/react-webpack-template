/**
 * @param {string} str
 * @returns {string}
 */
const replace = (str) => str.replace(/\/*\*/g, '');

/**
 *
 * @param {string[] | [string, [string]][]} list
 * @returns {string[] | string[][]}
 */
const removeDeepPattern = (list) =>
  list.map((item) => {
    // ts config paths
    if (
      Array.isArray(item) &&
      Array.isArray(item[1]) &&
      typeof Array.isArray(item[1][0] === 'string')
    ) {
      return [replace(item[0]), replace(item[1][0])];
    }

    if (typeof item === 'string') return replace(item);
  });

module.exports = {
  removeDeepPattern,
};
