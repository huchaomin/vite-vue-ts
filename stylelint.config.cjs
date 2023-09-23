/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-14 13:58:40
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-09-22 17:33:38
 * @Description  :
 */
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
  rules: {
    'selector-class-pattern': '^(v-|vxe-|([a-zA-Z][a-zA-Z0-9_]*[a-zA-Z0-9])$)', // 类名命名规则：只包括数字字母下划线, 以字母开头, 以字母数字结尾
  },
}
