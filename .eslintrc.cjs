const path = require('path');
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:vue/vue3-recommended', // 更为严格一点，推荐用这个
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: path.resolve(__dirname, 'tsconfig.eslint.json'),
    extraFileExtensions: ['.vue'],
  },
  plugins: [
    'vue',
  ],
  rules: {
    'comma-dangle': ['error', 'only-multiline'], // 与下面一行配合，只在多行时才要求逗号
    '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
    semi: ['error', 'always'], // 与下面一行配合,要分号
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/promise-function-async': 'off', // 返回为promise的函数不一定要async
    'vue/multi-word-component-names': 'off', // 组件名不一定必须驼峰
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'never',
        },
        svg: 'always',
        math: 'always',
      },
    ], // html标签不要自闭合
    '@typescript-eslint/strict-boolean-expressions': ['error', {
      allowNumber: false, // 不允许数字作为判断条件
      allowNullableString: true, // 允许string | null | undefined作为判断条件
    }],
    'space-before-function-paren': ['error', 'never'],
    '@typescript-eslint/space-before-function-paren': ['error', 'never']
  },
};
