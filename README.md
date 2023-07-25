# vite + vue3 + pinia + ts + eslint + stylelint + husky + only-allow

## todo list

- 升级包版本
- 添加i8n 好像有一个更好的vscode插件 分割包
- @vueuse（自动引入） 分割包
- less 对齐没有格式化
- 添加pritter
- NProgress
- 分割包
- 研究sass怎么用
- 第一次vuetify 样式加载错误
- 改变 组件的大小写
- VMain 高度不写死
- notify
- you should use the "customSyntax" option when linting something other than CSS
- optimizeDeps

## vite-plugin-checker

- add type checking and linting support for Vite
- Prompt errors in an overlay UI and terminal

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
  "stylelint-config-standard-less": "^9.0.0",
  "vite-plugin-stylelint": "^4.3.0",
}
```

## 安装 less

## 安装 husky 和 lint-staged

```bash
pnpm add husky lint-staged -D
pnpm dlx husky-init
```

## only-allow 规范化包管理器和nodejs版本

## 添加 vue-router

## 添加 pinia

- pinia-plugin-persistedstate 用于持久化存储

## 自动引入vue全家桶

## 自动引入自己写的插件

## 自动引入stores

## 自动引入 components

## 按需加载arco-vue,并支持自定义样式

## 添加打包分析工具

## 添加svg-icon

## 开启前端gzip压缩

## 添加 vite-plugin-vue-devtools

- 仅开发模式
- 仅vue3.0
- only supports single-instance Vue applications
- Doesn't support SSR
- 跟随如下hide属性

  ```js
  createApp({
    render: () => h(App),
    devtools: {
      hide: true,
    },
  })
  ```

## 添加 vite-plugin-html

- 可以向html模板中插入自定义变量和标签
- 支持多页面应用

## 添加 vite-plugin-inspect

- 用于在浏览器中查看vite插件的状态
