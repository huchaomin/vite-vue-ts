import { type ProxyOptions, defineConfig } from 'vite';
import type * as http from 'node:http';
import vue from '@vitejs/plugin-vue';
// import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import AutoImport from 'unplugin-auto-import/vite';
import autoImportStoreList from './build/autoImportStores.ts';
import { resolvePath } from './build/utils.ts';
import Components from 'unplugin-vue-components/vite';
import { vitePluginForArco } from '@arco-plugins/vite-vue';
import vuetify from 'vite-plugin-vuetify';
import { visualizer } from 'rollup-plugin-visualizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import viteCompression from 'vite-plugin-compression';
// import VueDevTools from 'vite-plugin-vue-devtools';
import { createHtmlPlugin } from 'vite-plugin-html';
import Inspect from 'vite-plugin-inspect';
import { manualChunks, chunkFileNames, assetFileNames } from './build/output.ts';

const isReport = process.env.report === 'true';
const isInspect = process.env.inspect === 'true';
const proxyTarget = 'http://192.168.2.206:9089/'; // 测试环境地址
// const proxyTarget = 'http://192.168.2.87:7899/'; // 测试环境地址（晓蕾）
// const proxyTarget = 'http://192.168.2.211:8080/'; // 测试环境地址（Robin）
const apiPrefix = 'jeecg-boot';

function bypass(req: http.IncomingMessage, res: http.ServerResponse, options: ProxyOptions): void {
  const proxyUrl = new URL(options.rewrite?.(req.url) ?? req.url, options.target as string).href || '';
  res.setHeader('X-Res-Proxyurl', proxyUrl); // 查看真实的请求地址
}

export default defineConfig((...arg) => {
  console.log('vite.config.ts', arg); // {mode: 'development', command: 'serve', ssrBuild: false }
  return {
    define: {
      API_PREFIX: JSON.stringify(apiPrefix),
    },
    resolve: {
      alias: {
        '@': resolvePath(__dirname, 'src'),
        img: resolvePath(__dirname, 'src/assets/images'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_variable.scss" as *;' +
          '@use "@/assets/css/_mixin.scss" as *;',
        },
        // less: {
        //   // additionalData: '@import "@/assets/css/variable.less";',
        //   javascriptEnabled: true,
        //   // importStyle: 'less', 配合使用
        //   // modifyVars: {
        //   //   'arcoblue-6': '#000000',
        //   // },
        // },
      },
    },
    plugins: [ // 不要随便更改顺序否则会报错
      eslint({
        cache: true,
        failOnWarning: true,
      }),
      stylelint({
        build: true,
        cacheLocation: '.cache/.stylelintcache',
      }),
      // checker({ vueTsc: true }),
      // VueDevTools({
      //   appendTo: 'src/main.ts', // 解决每第一次prebundle报错的问题
      // }),
      vue(), // 将会把SFC的代码转换成js代码
      vuetify({
        styles: {
          configFile: 'src/assets/css/_settings.scss',
        },
      }),
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
          enabled: true,
          globalsPropValue: 'readonly',
          filepath: 'eslintrc-auto-import.json',
        },
      }),
      Components({
        dts: 'types/components.d.ts',
      }), // 自动引入 src/components
      vitePluginForArco({
        theme: '@arco-themes/vue-qingcongkeji',
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
        build: isInspect,
        outputDir: '.cache/.vite-inspect',
      }),
      viteCompression(),
      ...isReport
        ? [visualizer({
            open: true,
            filename: '.cache/report.html',
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
      rollupOptions: {
        output: {
          manualChunks,
          chunkFileNames,
          assetFileNames,
        },
      },
    },
    optimizeDeps: {
      exclude: ['vuetify'],
      entries: [
        './src/**/*.vue',
      ],
    },
    server: {
      open: false,
      proxy: {
        // [`/${apiPrefix}/token`]: {
        //   target: proxyTarget,
        //   changeOrigin: true,
        //   rewrite: (p) => p.replace(new RegExp(`/${apiPrefix}/`), ''),
        // },
        [`/${apiPrefix}`]: {
          target: proxyTarget,
          changeOrigin: true,
          bypass,
        },
      },
    },
  };
});
