/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-08-06 09:42:59
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-30 14:22:42
 * @Description  :
 */
import { type ProxyOptions, defineConfig } from 'vite'
import type * as http from 'node:http'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'
import AutoImport from 'unplugin-auto-import/vite'
import autoImportStoreList from './build/autoImportStores.ts'
import { resolvePath } from './build/utils.ts'
import Components from 'unplugin-vue-components/vite'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import vuetify from 'vite-plugin-vuetify'
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'
import VueDevTools from 'vite-plugin-vue-devtools'
import Inspect from 'vite-plugin-inspect'
import { manualChunks, chunkFileNames, assetFileNames } from './build/output.ts'
import config from './build/config.ts'

const isReport = process.env.report === 'true'
const isInspect = process.env.inspect === 'true'
const projectName = 'zg'

const { appName, apiPrefix, proxyTarget } = config[projectName]

function bypass(req: http.IncomingMessage, res: http.ServerResponse, options: ProxyOptions): void {
  const proxyUrl =
    new URL(options.rewrite?.(req.url) ?? req.url, options.target as string).href ?? ''
  res.setHeader('X-Res-Proxyurl', proxyUrl) // 查看真实的请求地址
}

export default defineConfig((...arg) => {
  console.log('vite.config.ts', arg) // {mode: 'development', command: 'serve', ssrBuild: false }
  return {
    define: {
      API_PREFIX: JSON.stringify(apiPrefix),
      APP_NAME: JSON.stringify(appName),
      PROJECT_NAME: JSON.stringify(projectName),
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
          additionalData:
            '@use "@/assets/css/_variable.scss" as *;' +
            '@use "@/assets/css/_mixin.scss" as *;' +
            '@use "@/assets/css/_settings.scss" as *;',
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
    plugins: [
      // 不要随便更改顺序否则会报错
      eslint({
        cache: true,
        failOnError: false,
      }),
      stylelint({
        build: true,
        cacheLocation: '.cache/.stylelintcache',
      }),
      VueDevTools({
        appendTo: 'src/router/index.ts', // 解决每第一次prebundle报错的问题 好像要在createApp前面加载
      }),
      vue(), // 将会把SFC的代码转换成js代码
      vueJsx(), // 支持jsx
      vuetify({ styles: { configFile: 'src/assets/css/_settings.scss' } }),
      AutoImport({
        vueTemplate: true, // Auto import inside Vue template
        dts: 'types/auto-imports.d.ts',
        imports: [
          // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core',
          autoImportStoreList,
        ],
        defaultExportByFilename: true,
        dirs: ['src/plugins/autoImport'],
        eslintrc: {
          enabled: true,
          globalsPropValue: 'readonly',
          filepath: 'eslintrc-auto-import.json',
        },
      }),
      Components({
        dirs: ['src/components/global'],
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
      Inspect({
        build: isInspect,
        outputDir: '.cache/.vite-inspect',
      }),
      viteCompression(),
      ...(isReport
        ? [
            visualizer({
              open: true,
              filename: '.cache/report.html',
            }),
          ]
        : []),
    ],
    build: {
      reportCompressedSize: false,
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
      entries: ['./src/**/*.vue'],
    },
    server: {
      host: '0.0.0.0', // 可以用ip访问
      port: 9001,
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
  }
})
