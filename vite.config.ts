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
import { visualizer } from 'rollup-plugin-visualizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import viteCompression from 'vite-plugin-compression';
import VueDevTools from 'vite-plugin-vue-devtools';
import { createHtmlPlugin } from 'vite-plugin-html';
import Inspect from 'vite-plugin-inspect';

export default defineConfig(async ({ mode }) => {
  const cArgv = process.argv.slice(4);

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
    plugins: [ // 不要随便更改顺序否则会报错
      eslint({
        cache: true,
        failOnWarning: true,
      }),
      stylelint({ build: true }),
      checker({ vueTsc: true }),
      VueDevTools(),
      vue(), // 将会把SFC的代码转换成js代码
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
        // iconBox https://arco.design/iconbox/libs
      }),
      createSvgIconsPlugin({
        iconDirs: [resolvePath(__dirname, 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]',
      }),
      createHtmlPlugin({
        minify: true, // 是否压缩 html
        // entry: 'src/main.ts', // 入口文件（默认值，不能省）[不能用，打包时报错]
        template: 'public/index.html', // 模板的路径
      }),
      Inspect({
        build: true,
        outputDir: '.vite-inspect',
      }),
      viteCompression(),
      ...cArgv.includes('report')
        ? [visualizer({
            open: true,
          })]
        : [],
    ],
    build: {
      reportCompressedSize: false,
      minify: 'terser', // 压缩的更小，但是速度会慢一点
      terserOptions: {
        compress: {
          // https://terser.org/docs/options/#parse-options
          drop_console: true,
          keep_infinity: true, // 通过true以防止Infinity被压缩为1/0
          keep_fargs: false, // 通过false以删除未使用的函数参数
          toplevel: true, // 通过true以丢弃未引用的顶级变量名
        },
      },
    },
  };
});
