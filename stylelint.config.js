module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'include',
          'extend',
          'mixin',
          'each',
          'if',
          'else',
          'for',
        ],
      },
    ],
    'no-descending-specificity': null,
  },
}
