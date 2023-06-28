module.exports = {
  extends: [
    'stylelint-config-standard-less',
    'stylelint-config-rational-order',
  ],
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {},
};
