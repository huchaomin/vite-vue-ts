import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import AutoImport from 'unplugin-auto-import/vite';
import autoImportStoreList from './build/autoImportStores.ts';
import { resolvePath } from './build/utils.ts';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(async ({ mode }) => {
  const isDev = mode === 'development';
  return {
    resolve: {
      alias: {
        '@': resolvePath(__dirname, 'src'),
        img: resolvePath(__dirname, 'src/assets/images'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/assets/css/variable.less";',
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue(),
      eslint({
        cache: true,
        failOnWarning: true,
      }),
      stylelint({ build: true }),
      checker({ vueTsc: true }),
      AutoImport({
        vueTemplate: true, // Auto import inside Vue template
        dts: 'types/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          'pinia',
          autoImportStoreList,
        ],
        defaultExportByFilename: true,
        dirs: [
          './src/plugins/autoImport',
        ],
        eslintrc: {
          enabled: isDev,
          globalsPropValue: 'readonly',
        },
        resolvers: [ArcoResolver()], // 与下面配合自动引入 arco-vue 组件
        // 这种方法并不会处理用户在 script 中手动导入的组件，比如 Message 组件，用户仍需要手动导入组件对应的样式文件，例如 @arco-design/web-vue/es/message/style/css.js
      }),
      Components({
        dts: 'types/components.d.ts',
        resolvers: [
          ArcoResolver({
            sideEffect: true,
          }),
        ],
      }), // 自动引入 src/components
    ],
  };
});
