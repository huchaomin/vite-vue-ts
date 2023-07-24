module.exports = {
  extends: [
    'stylelint-config-standard-less',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue',
  ],
  // 解决控制台警告 you should use the "customSyntax" option when linting something other than CSS
  // scss 好像不需要，stylelint-config-standard-less 这个包不包含 postcss-less
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    'selector-class-pattern': null,
  },
};
