# vite + vue3 + ts + eslint

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
  extraFileExtensions: ['.vue']
},
```

遇到奇怪的错误 restart eslint server

## 安装 vite-plugin-eslint

用于在Vite 构建过程中集成ESLint 检查的插件

```bash
pnpm add vite-plugin-eslint@latest -D
```
