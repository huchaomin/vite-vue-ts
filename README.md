# vite + vue3 + pinia + ts + eslint + stylelint + husky + only-allow

## todo list

- 升级包版本
- autoimport store
- 添加i8n 好像有一个更好的vscode插件
- 添加axios 好像有个更好的插件
- 引入ui插件
- 引入css

## vite-plugin-checker

- add type checking and linting support for Vite
- Prompt errors in an overlay UI and terminal
- //TODO 不知道使用体验如何

## 安装eslint 和 parser

```bash
pnpm create @eslint/config
pnpm add @typescript-eslint/parser -D
```

此过程中会安装 `eslint-plugin-vue`, 而该安装包中会自带 `vue-eslint-parser`

然后按[此说明](https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser)修改配置

遇到报错

```js
parserOptions: {
  project: './tsconfig.json',
  extraFileExtensions: ['.vue'] // 这个与setting.json中的eslint.validate有关
},
```

遇到奇怪的错误 restart eslint server

## 安装 vite-plugin-eslint

用于在Vite 构建过程中集成ESLint 检查的插件

```bash
pnpm add vite-plugin-eslint@latest -D
```

## 安装stylelint 和 vite-plugin-stylelint

```json
"devDependencies": {
  "postcss-html": "^1.5.0",
  "stylelint": "^15.9.0",
  "stylelint-config-rational-order": "^0.1.2",
  "stylelint-config-standard-scss": "^9.0.0",
  "vite-plugin-stylelint": "^4.3.0",
}
```

## 安装 sass

## 安装 husky 和 lint-staged

```bash
pnpm add husky lint-staged -D
pnpm dlx husky-init
```

## only-allow 规范化包管理器和nodejs版本

## 添加 vue-router

## 添加 pinia

- pinia-plugin-persistedstate // TODO 试试这个插件
