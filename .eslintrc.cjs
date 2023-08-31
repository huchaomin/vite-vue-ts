const path = require('path')

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
    './eslintrc-auto-import.json',
    'prettier', // 一定要是最后一个，才能确保覆盖 https://www.kancloud.cn/cyyspring/webpack/2015917
  ],
  overrides: [
    {
      env: { node: true },
      files: [
        '.eslintrc.{js,cjs}',
        'stylelint.config.{js,cjs}',
        '.prettierrc.cjs',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
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
  plugins: ['prettier', 'vue'],
  rules: {
    'prettier/prettier': 'error', // prettier报错
    'arrow-body-style': 'off', // 箭头函数体样式
    'prefer-arrow-callback': 'off', // 回调优先使用箭头函数
    'vue/max-attributes-per-line': 'off', // 每行最大属性数
    'object-curly-newline': 'off', // 大括号内换行符
    semi: 'off',
    '@typescript-eslint/semi': 'error', // 不要分号，prettier会给ts的interface加分号
    indent: 'off',
    '@typescript-eslint/indent': 'off', // 缩进
    // 上面都是为了防止与prettier冲突
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }], // 允许promise reject时不传值
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
      },
    ], // 组件名必须为PascalCase
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产环境禁止debugger
    '@typescript-eslint/no-misused-promises': 'off', // 允许promise返回值不被使用
    '@typescript-eslint/triple-slash-reference': 'off', // 开启三斜线引用
    '@typescript-eslint/no-floating-promises': 'off', // 允许未处理的promise
    '@typescript-eslint/no-dynamic-delete': 'off', // 允许删除动态属性
    '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用!断言
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ], // 与下面一行配合，只在多行时才要求逗号
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        enums: 'always-multiline',
        generics: 'always-multiline',
        tuples: 'always-multiline',
      },
    ],
    '@typescript-eslint/promise-function-async': 'off', // 返回为promise的函数不一定要async
    'vue/multi-word-component-names': 'off', // 组件名不是必须多个单词
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
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowNumber: false, // 不允许数字作为判断条件
        allowNullableString: true, // 允许string | null | undefined作为判断条件
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ], // function后面空格
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
          },
        },
      },
    ],
    'vue/singleline-html-element-content-newline': 'off', // 单行html元素内容不要换行
    '@typescript-eslint/restrict-plus-operands': ['error', { // @typescript-eslint/eslint-plugin 升级到可能6.1以上
      allowAny: false,
      allowBoolean: false,
      allowNullish: false,
      allowNumberAndString: false,
      allowRegExp: false,
      skipCompoundAssignments: true,
    }]
  },
}
