// @ts-check

/**
 * @param {string} str
 * @returns {string}
 */
const replace = (str) => str.replace(/\/*\*/g, '');

/**
 *
 * @param {[string, string[]][] | Record<string, string[]>} targetData
 * @returns {[string, string][]}
 */
const removeDeepPattern = (targetData) => {
  const dataList = Array.isArray(targetData) ? targetData : Object.entries(targetData);

  return dataList.map((pathItem) => [replace(pathItem[0]), replace(pathItem[1][0])]);
};

module.exports = removeDeepPattern;
