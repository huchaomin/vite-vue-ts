import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import AutoImport from 'unplugin-auto-import/vite';

const resolvePath = (p: string): string => path.resolve(__dirname, p);

export default defineConfig(({ mode }) => {
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
