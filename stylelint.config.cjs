module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order'
  ],
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    // 'at-rule-no-unknown': [true,
    //   {
    //     ignoreAtRules: ['forward', 'use', 'mixin', 'include'],
    //   },
    // ],
    'selector-pseudo-class-no-unknown': [true,
      {
        ignorePseudoClasses: ['deep']
      }
    ],
    'selector-class-pattern': null
    // 'scss/at-mixin-pattern': null,
  }
}
