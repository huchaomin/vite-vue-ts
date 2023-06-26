import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import AutoImport from 'unplugin-auto-import/vite';
import autoImportStoreList from './build/autoImportStores.ts';
import { resolvePath } from './build/utils.ts';

console.log(autoImportStoreList);

export default defineConfig(async ({ mode }) => {
  const isDev = mode === 'development';
  return {
    resolve: {
      alias: {
        '@': resolvePath('src'),
        img: resolvePath('src/assets/images')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_variable.scss" as *;'
        }
      }
    },
    plugins: [
      vue(),
      eslint({
        cache: true,
        failOnWarning: true
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
      })
    ]
  };
});
