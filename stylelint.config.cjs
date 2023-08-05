module.exports = {
  extends: [
    // 'stylelint-config-standard-less',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue',
  ],
  // 解决控制台警告 you should use the "customSyntax" option when linting something other than CSS
  // stylelint-config-standard-less 这个包不包含 postcss-less
  // scss 不需要overrides， stylelint-config-standard-scss 这个包包含 postcss-scss
  // 如果使用less的话，需要安装 postcss-less、stylelint-config-standard-less 并把注释打开
  // overrides: [
  //   {
  //     files: ['**/*.less'],
  //     customSyntax: 'postcss-less',
  //   },
  // ],
  rules: { 'selector-class-pattern': null },
}
