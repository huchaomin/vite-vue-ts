import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import AutoImport from 'unplugin-auto-import/vite';
import autoImportStoreList from './build/autoImportStores.ts';
import { resolvePath } from './build/utils.ts';
import Components from 'unplugin-vue-components/vite';
import { vitePluginForArco } from '@arco-plugins/vite-vue';

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
          // importStyle: 'less', 配合使用
          // modifyVars: {
          //   'arcoblue-6': '#000000',
          // },
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
          'src/plugins/autoImport',
        ],
        eslintrc: {
          enabled: isDev,
          globalsPropValue: 'readonly',
        },
      }),
      Components({
        dts: 'types/components.d.ts',
      }), // 自动引入 src/components
      vitePluginForArco({
        theme: '@arco-themes/vue-mulinzi',
      }),
    ],
  };
});
