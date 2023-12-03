// @ts-check

/** @type {import("stylelint").Config} */
const config = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    // 'function-no-unknown': null,
    // 'no-empty-source': null,
    // 'selector-class-pattern': null,
    // 'keyframes-name-pattern': null,
    // 'scss/no-global-function-names': null,
    'at-rule-no-unknown': null
  },
};

module.exports = config;
