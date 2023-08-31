// vite.config.ts
import { defineConfig } from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/vite@4.4.9_@types+node@20.5.6_less@4.2.0_sass@1.66.1_terser@5.19.2/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/@vitejs+plugin-vue@4.3.3_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import eslint from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.48.0_vite@4.4.9/node_modules/vite-plugin-eslint/dist/index.mjs";
import stylelint from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/vite-plugin-stylelint@5.1.1_postcss@8.4.28_stylelint@15.10.3_vite@4.4.9/node_modules/vite-plugin-stylelint/dist/index.mjs";
import AutoImport from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.4.0/node_modules/unplugin-auto-import/dist/vite.js";

// build/autoImportStores.ts
import path2 from "path";
import fg from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/fast-glob@3.3.1/node_modules/fast-glob/out/index.js";

// build/utils.ts
import path from "path";
function firstUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function resolvePath(dirname, p) {
  return path.resolve(dirname, p);
}

// build/autoImportStores.ts
var piniaStoreKeys = [];
var files = fg.globSync("src/store/modules/*.ts");
files.forEach((p) => {
  piniaStoreKeys.push(path2.basename(p, ".ts"));
});
var customerImport = {};
piniaStoreKeys.forEach((key) => {
  customerImport[`@/store/modules/${key}`] = [
    ["default", `use${firstUpperCase(key)}Store`]
  ];
});
var autoImportStores_default = customerImport;

// vite.config.ts
import Components from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { vitePluginForArco } from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/@arco-plugins+vite-vue@1.4.5/node_modules/@arco-plugins/vite-vue/lib/index.js";
import vuetify from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/vite-plugin-vuetify@1.0.2_vite@4.4.9_vue@3.3.4_vuetify@3.3.14/node_modules/vite-plugin-vuetify/dist/index.js";
import { visualizer } from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { createSvgIconsPlugin } from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.4.9/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import viteCompression from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.4.9/node_modules/vite-plugin-compression/dist/index.mjs";
import VueDevTools from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/vite-plugin-vue-devtools@1.0.0-rc.2_pug@3.0.2_vite@4.4.9/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { createHtmlPlugin } from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/vite-plugin-html@3.2.0_vite@4.4.9/node_modules/vite-plugin-html/dist/index.mjs";
import Inspect from "file:///C:/Users/aolan/Documents/GitHub/vite-vue-ts/node_modules/.pnpm/vite-plugin-inspect@0.7.38_vite@4.4.9/node_modules/vite-plugin-inspect/dist/index.mjs";

// build/output.ts
var arcoVueUtilsRe = /node_modules[\\/]resize-observer-polyfill[\\/](.*)\.js$/;
var arcoVueOnDemandRE = /node_modules[\\/]@arco-design[\\/](.*)\.(m?js|css|scss|sass|json)$/;
var vendorRE = [
  /node_modules[\\/](@vue|vue-router|vue-i18n|pinia|pinia-plugin-persistedstate)[\\/](.*)\.(m?js|css|scss|sass|json)$/,
  /virtual:svg-icons-register/,
  /plugin-vue:export-helper/,
  /vite[\\/]preload-helper/,
  /vite[\\/]modulepreload-polyfill/
];
function manualChunks(id) {
  if (arcoVueUtilsRe.test(id)) {
    return "arcoVueUtils";
  }
  if (arcoVueOnDemandRE.test(id)) {
    return "arcoVueOnDemand";
  }
  if (vendorRE.some((r) => r.test(id))) {
    return "vendor";
  }
}
function chunkFileNames() {
  return "chunk/[name]-[hash].js";
}
function assetFileNames(assetInfo) {
  return "assets/[name]-[hash][extname]";
}

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\aolan\\Documents\\GitHub\\vite-vue-ts";
var isReport = process.env.report === "true";
var isInspect = process.env.inspect === "true";
var proxyTarget = "http://192.168.2.206:9089/";
var apiPrefix = "jeecg-boot";
function bypass(req, res, options) {
  var _a;
  const proxyUrl = new URL(((_a = options.rewrite) == null ? void 0 : _a.call(options, req.url)) ?? req.url, options.target).href || "";
  res.setHeader("X-Res-Proxyurl", proxyUrl);
}
var vite_config_default = defineConfig((...arg) => {
  console.log("vite.config.ts", arg);
  return {
    define: { API_PREFIX: JSON.stringify(apiPrefix) },
    resolve: {
      alias: {
        "@": resolvePath(__vite_injected_original_dirname, "src"),
        img: resolvePath(__vite_injected_original_dirname, "src/assets/images")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_variable.scss" as *;@use "@/assets/css/_mixin.scss" as *;@use "@/assets/css/_settings.scss" as *;'
        }
        // less: {
        //   // additionalData: '@import "@/assets/css/variable.less";',
        //   javascriptEnabled: true,
        //   // importStyle: 'less', 配合使用
        //   // modifyVars: {
        //   //   'arcoblue-6': '#000000',
        //   // },
        // },
      }
    },
    plugins: [
      // 不要随便更改顺序否则会报错
      eslint({
        cache: true,
        failOnError: false
      }),
      stylelint({
        build: true,
        cacheLocation: ".cache/.stylelintcache"
      }),
      VueDevTools({
        appendTo: "src/router/index.ts"
        // 解决每第一次prebundle报错的问题 好像要在createApp前面加载
      }),
      vue(),
      // 将会把SFC的代码转换成js代码
      vuetify({ styles: { configFile: "src/assets/css/_settings.scss" } }),
      AutoImport({
        vueTemplate: true,
        // Auto import inside Vue template
        dts: "types/auto-imports.d.ts",
        imports: [
          // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
          "vue",
          "vue-router",
          "pinia",
          "@vueuse/core",
          autoImportStores_default
        ],
        defaultExportByFilename: true,
        dirs: ["src/plugins/autoImport"],
        eslintrc: {
          enabled: true,
          globalsPropValue: "readonly",
          filepath: "eslintrc-auto-import.json"
        }
      }),
      Components({
        dirs: ["src/components/global"],
        dts: "types/components.d.ts"
      }),
      // 自动引入 src/components
      vitePluginForArco({
        theme: "@arco-themes/vue-qingcongkeji"
        // iconBox https://arco.design/iconbox/libs
      }),
      createSvgIconsPlugin({
        iconDirs: [resolvePath(__vite_injected_original_dirname, "src/assets/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      createHtmlPlugin({
        minify: true,
        // 是否压缩 html
        // entry: 'src/main.ts', // 入口文件（默认值，不能省）[不能用，打包时报错]
        template: "public/index.html"
        // 模板的路径
      }),
      Inspect({
        build: isInspect,
        outputDir: ".cache/.vite-inspect"
      }),
      viteCompression(),
      ...isReport ? [
        visualizer({
          open: true,
          filename: ".cache/report.html"
        })
      ] : []
    ],
    build: {
      reportCompressedSize: false,
      minify: "terser",
      // 压缩的更小，但是速度会慢一点
      terserOptions: {
        compress: {
          // https://terser.org/docs/options/#parse-options
          drop_console: true,
          keep_infinity: true,
          // 通过true以防止Infinity被压缩为1/0
          keep_fargs: false,
          // 通过false以删除未使用的函数参数
          toplevel: true
          // 通过true以丢弃未引用的顶级变量名
        }
      },
      rollupOptions: {
        output: {
          manualChunks,
          chunkFileNames,
          assetFileNames
        }
      }
    },
    optimizeDeps: {
      exclude: ["vuetify"],
      entries: ["./src/**/*.vue"]
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
          bypass
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvYXV0b0ltcG9ydFN0b3Jlcy50cyIsICJidWlsZC91dGlscy50cyIsICJidWlsZC9vdXRwdXQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhb2xhblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHZpdGUtdnVlLXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhb2xhblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHZpdGUtdnVlLXRzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hb2xhbi9Eb2N1bWVudHMvR2l0SHViL3ZpdGUtdnVlLXRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgdHlwZSBQcm94eU9wdGlvbnMsIGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdHlwZSAqIGFzIGh0dHAgZnJvbSAnbm9kZTpodHRwJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgZXNsaW50IGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCdcbmltcG9ydCBzdHlsZWxpbnQgZnJvbSAndml0ZS1wbHVnaW4tc3R5bGVsaW50J1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBhdXRvSW1wb3J0U3RvcmVMaXN0IGZyb20gJy4vYnVpbGQvYXV0b0ltcG9ydFN0b3Jlcy50cydcbmltcG9ydCB7IHJlc29sdmVQYXRoIH0gZnJvbSAnLi9idWlsZC91dGlscy50cydcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyB2aXRlUGx1Z2luRm9yQXJjbyB9IGZyb20gJ0BhcmNvLXBsdWdpbnMvdml0ZS12dWUnXG5pbXBvcnQgdnVldGlmeSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5J1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCdcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXG5pbXBvcnQgeyBtYW51YWxDaHVua3MsIGNodW5rRmlsZU5hbWVzLCBhc3NldEZpbGVOYW1lcyB9IGZyb20gJy4vYnVpbGQvb3V0cHV0LnRzJ1xuXG5jb25zdCBpc1JlcG9ydCA9IHByb2Nlc3MuZW52LnJlcG9ydCA9PT0gJ3RydWUnXG5jb25zdCBpc0luc3BlY3QgPSBwcm9jZXNzLmVudi5pbnNwZWN0ID09PSAndHJ1ZSdcbmNvbnN0IHByb3h5VGFyZ2V0ID0gJ2h0dHA6Ly8xOTIuMTY4LjIuMjA2OjkwODkvJyAvLyBcdTZENEJcdThCRDVcdTczQUZcdTU4ODNcdTU3MzBcdTU3NDBcbi8vIGNvbnN0IHByb3h5VGFyZ2V0ID0gJ2h0dHA6Ly8xOTIuMTY4LjIuODc6Nzg5OS8nOyAvLyBcdTZENEJcdThCRDVcdTczQUZcdTU4ODNcdTU3MzBcdTU3NDBcdUZGMDhcdTY2NTNcdTg1N0VcdUZGMDlcbi8vIGNvbnN0IHByb3h5VGFyZ2V0ID0gJ2h0dHA6Ly8xOTIuMTY4LjIuMjExOjgwODAvJzsgLy8gXHU2RDRCXHU4QkQ1XHU3M0FGXHU1ODgzXHU1NzMwXHU1NzQwXHVGRjA4Um9iaW5cdUZGMDlcbmNvbnN0IGFwaVByZWZpeCA9ICdqZWVjZy1ib290J1xuXG5mdW5jdGlvbiBieXBhc3MoXG4gIHJlcTogaHR0cC5JbmNvbWluZ01lc3NhZ2UsXG4gIHJlczogaHR0cC5TZXJ2ZXJSZXNwb25zZSxcbiAgb3B0aW9uczogUHJveHlPcHRpb25zLFxuKTogdm9pZCB7XG4gIGNvbnN0IHByb3h5VXJsID1cbiAgICBuZXcgVVJMKG9wdGlvbnMucmV3cml0ZT8uKHJlcS51cmwpID8/IHJlcS51cmwsIG9wdGlvbnMudGFyZ2V0IGFzIHN0cmluZylcbiAgICAgIC5ocmVmIHx8ICcnXG4gIHJlcy5zZXRIZWFkZXIoJ1gtUmVzLVByb3h5dXJsJywgcHJveHlVcmwpIC8vIFx1NjdFNVx1NzcwQlx1NzcxRlx1NUI5RVx1NzY4NFx1OEJGN1x1NkM0Mlx1NTczMFx1NTc0MFxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKC4uLmFyZykgPT4ge1xuICBjb25zb2xlLmxvZygndml0ZS5jb25maWcudHMnLCBhcmcpIC8vIHttb2RlOiAnZGV2ZWxvcG1lbnQnLCBjb21tYW5kOiAnc2VydmUnLCBzc3JCdWlsZDogZmFsc2UgfVxuICByZXR1cm4ge1xuICAgIGRlZmluZTogeyBBUElfUFJFRklYOiBKU09OLnN0cmluZ2lmeShhcGlQcmVmaXgpIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiByZXNvbHZlUGF0aChfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgICAgaW1nOiByZXNvbHZlUGF0aChfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL2ltYWdlcycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6XG4gICAgICAgICAgICAnQHVzZSBcIkAvYXNzZXRzL2Nzcy9fdmFyaWFibGUuc2Nzc1wiIGFzICo7JyArXG4gICAgICAgICAgICAnQHVzZSBcIkAvYXNzZXRzL2Nzcy9fbWl4aW4uc2Nzc1wiIGFzICo7JyArXG4gICAgICAgICAgICAnQHVzZSBcIkAvYXNzZXRzL2Nzcy9fc2V0dGluZ3Muc2Nzc1wiIGFzICo7JyxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gbGVzczoge1xuICAgICAgICAvLyAgIC8vIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIkAvYXNzZXRzL2Nzcy92YXJpYWJsZS5sZXNzXCI7JyxcbiAgICAgICAgLy8gICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgLy8gICAvLyBpbXBvcnRTdHlsZTogJ2xlc3MnLCBcdTkxNERcdTU0MDhcdTRGN0ZcdTc1MjhcbiAgICAgICAgLy8gICAvLyBtb2RpZnlWYXJzOiB7XG4gICAgICAgIC8vICAgLy8gICAnYXJjb2JsdWUtNic6ICcjMDAwMDAwJyxcbiAgICAgICAgLy8gICAvLyB9LFxuICAgICAgICAvLyB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIC8vIFx1NEUwRFx1ODk4MVx1OTY4Rlx1NEZCRlx1NjZGNFx1NjUzOVx1OTg3QVx1NUU4Rlx1NTQyNlx1NTIxOVx1NEYxQVx1NjJBNVx1OTUxOVxuICAgICAgZXNsaW50KHtcbiAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgIGZhaWxPbkVycm9yOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICAgc3R5bGVsaW50KHtcbiAgICAgICAgYnVpbGQ6IHRydWUsXG4gICAgICAgIGNhY2hlTG9jYXRpb246ICcuY2FjaGUvLnN0eWxlbGludGNhY2hlJyxcbiAgICAgIH0pLFxuICAgICAgVnVlRGV2VG9vbHMoe1xuICAgICAgICBhcHBlbmRUbzogJ3NyYy9yb3V0ZXIvaW5kZXgudHMnLCAvLyBcdTg5RTNcdTUxQjNcdTZCQ0ZcdTdCMkNcdTRFMDBcdTZCMjFwcmVidW5kbGVcdTYyQTVcdTk1MTlcdTc2ODRcdTk1RUVcdTk4OTggXHU1OTdEXHU1MENGXHU4OTgxXHU1NzI4Y3JlYXRlQXBwXHU1MjREXHU5NzYyXHU1MkEwXHU4RjdEXG4gICAgICB9KSxcbiAgICAgIHZ1ZSgpLCAvLyBcdTVDMDZcdTRGMUFcdTYyOEFTRkNcdTc2ODRcdTRFRTNcdTc4MDFcdThGNkNcdTYzNjJcdTYyMTBqc1x1NEVFM1x1NzgwMVxuICAgICAgdnVldGlmeSh7IHN0eWxlczogeyBjb25maWdGaWxlOiAnc3JjL2Fzc2V0cy9jc3MvX3NldHRpbmdzLnNjc3MnIH0gfSksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsIC8vIEF1dG8gaW1wb3J0IGluc2lkZSBWdWUgdGVtcGxhdGVcbiAgICAgICAgZHRzOiAndHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgICBpbXBvcnRzOiBbXG4gICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0L3RyZWUvbWFpbi9zcmMvcHJlc2V0c1xuICAgICAgICAgICd2dWUnLFxuICAgICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgICAncGluaWEnLFxuICAgICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICAgIGF1dG9JbXBvcnRTdG9yZUxpc3QsXG4gICAgICAgIF0sXG4gICAgICAgIGRlZmF1bHRFeHBvcnRCeUZpbGVuYW1lOiB0cnVlLFxuICAgICAgICBkaXJzOiBbJ3NyYy9wbHVnaW5zL2F1dG9JbXBvcnQnXSxcbiAgICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGdsb2JhbHNQcm9wVmFsdWU6ICdyZWFkb25seScsXG4gICAgICAgICAgZmlsZXBhdGg6ICdlc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJyxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMvZ2xvYmFsJ10sXG4gICAgICAgIGR0czogJ3R5cGVzL2NvbXBvbmVudHMuZC50cycsXG4gICAgICB9KSwgLy8gXHU4MUVBXHU1MkE4XHU1RjE1XHU1MTY1IHNyYy9jb21wb25lbnRzXG4gICAgICB2aXRlUGx1Z2luRm9yQXJjbyh7XG4gICAgICAgIHRoZW1lOiAnQGFyY28tdGhlbWVzL3Z1ZS1xaW5nY29uZ2tlamknLFxuICAgICAgICAvLyBpY29uQm94IGh0dHBzOi8vYXJjby5kZXNpZ24vaWNvbmJveC9saWJzXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgaWNvbkRpcnM6IFtyZXNvbHZlUGF0aChfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL3N2ZycpXSxcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xuICAgICAgICBtaW5pZnk6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NTM4Qlx1N0YyOSBodG1sXG4gICAgICAgIC8vIGVudHJ5OiAnc3JjL21haW4udHMnLCAvLyBcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdUZGMDhcdTlFRDhcdThCQTRcdTUwM0NcdUZGMENcdTRFMERcdTgwRkRcdTc3MDFcdUZGMDlbXHU0RTBEXHU4MEZEXHU3NTI4XHVGRjBDXHU2MjUzXHU1MzA1XHU2NUY2XHU2MkE1XHU5NTE5XVxuICAgICAgICB0ZW1wbGF0ZTogJ3B1YmxpYy9pbmRleC5odG1sJywgLy8gXHU2QTIxXHU2NzdGXHU3Njg0XHU4REVGXHU1Rjg0XG4gICAgICB9KSxcbiAgICAgIEluc3BlY3Qoe1xuICAgICAgICBidWlsZDogaXNJbnNwZWN0LFxuICAgICAgICBvdXRwdXREaXI6ICcuY2FjaGUvLnZpdGUtaW5zcGVjdCcsXG4gICAgICB9KSxcbiAgICAgIHZpdGVDb21wcmVzc2lvbigpLFxuICAgICAgLi4uKGlzUmVwb3J0XG4gICAgICAgID8gW1xuICAgICAgICAgICAgdmlzdWFsaXplcih7XG4gICAgICAgICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgICAgICAgIGZpbGVuYW1lOiAnLmNhY2hlL3JlcG9ydC5odG1sJyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSksXG4gICAgXSxcbiAgICBidWlsZDoge1xuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxuICAgICAgbWluaWZ5OiAndGVyc2VyJywgLy8gXHU1MzhCXHU3RjI5XHU3Njg0XHU2NkY0XHU1QzBGXHVGRjBDXHU0RjQ2XHU2NjJGXHU5MDFGXHU1RUE2XHU0RjFBXHU2MTYyXHU0RTAwXHU3MEI5XG4gICAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgICAgLy8gaHR0cHM6Ly90ZXJzZXIub3JnL2RvY3Mvb3B0aW9ucy8jcGFyc2Utb3B0aW9uc1xuICAgICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgICBrZWVwX2luZmluaXR5OiB0cnVlLCAvLyBcdTkwMUFcdThGQzd0cnVlXHU0RUU1XHU5NjMyXHU2QjYySW5maW5pdHlcdTg4QUJcdTUzOEJcdTdGMjlcdTRFM0ExLzBcbiAgICAgICAgICBrZWVwX2ZhcmdzOiBmYWxzZSwgLy8gXHU5MDFBXHU4RkM3ZmFsc2VcdTRFRTVcdTUyMjBcdTk2NjRcdTY3MkFcdTRGN0ZcdTc1MjhcdTc2ODRcdTUxRkRcdTY1NzBcdTUzQzJcdTY1NzBcbiAgICAgICAgICB0b3BsZXZlbDogdHJ1ZSwgLy8gXHU5MDFBXHU4RkM3dHJ1ZVx1NEVFNVx1NEUyMlx1NUYwM1x1NjcyQVx1NUYxNVx1NzUyOFx1NzY4NFx1OTg3Nlx1N0VBN1x1NTNEOFx1OTFDRlx1NTQwRFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzLFxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgZXhjbHVkZTogWyd2dWV0aWZ5J10sXG4gICAgICBlbnRyaWVzOiBbJy4vc3JjLyoqLyoudnVlJ10sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgLy8gW2AvJHthcGlQcmVmaXh9L3Rva2VuYF06IHtcbiAgICAgICAgLy8gICB0YXJnZXQ6IHByb3h5VGFyZ2V0LFxuICAgICAgICAvLyAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgLy8gICByZXdyaXRlOiAocCkgPT4gcC5yZXBsYWNlKG5ldyBSZWdFeHAoYC8ke2FwaVByZWZpeH0vYCksICcnKSxcbiAgICAgICAgLy8gfSxcbiAgICAgICAgW2AvJHthcGlQcmVmaXh9YF06IHtcbiAgICAgICAgICB0YXJnZXQ6IHByb3h5VGFyZ2V0LFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICBieXBhc3MsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFvbGFuXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcdml0ZS12dWUtdHNcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFvbGFuXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcdml0ZS12dWUtdHNcXFxcYnVpbGRcXFxcYXV0b0ltcG9ydFN0b3Jlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW9sYW4vRG9jdW1lbnRzL0dpdEh1Yi92aXRlLXZ1ZS10cy9idWlsZC9hdXRvSW1wb3J0U3RvcmVzLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBmZyBmcm9tICdmYXN0LWdsb2InXG5pbXBvcnQgeyBmaXJzdFVwcGVyQ2FzZSB9IGZyb20gJy4vdXRpbHMudHMnXG5cbmNvbnN0IHBpbmlhU3RvcmVLZXlzOiBzdHJpbmdbXSA9IFtdXG4vLyBmdW5jdGlvbiBmaWxlUmVjdXJzaW9uKGZpbGVQYXRoIDpzdHJpbmcpIDp2b2lkIHtcbi8vICAgY29uc3QgZmlsZXMgPSByZWFkZGlyU3luYyhmaWxlUGF0aCk7XG4vLyAgIGZpbGVzLmZvckVhY2goKGZpbGVOYW1lKSA9PiB7XG4vLyAgICAgY29uc3QgZmlsZVAgPSBwYXRoLmpvaW4oZmlsZVBhdGgsIGZpbGVOYW1lKTtcbi8vICAgICBjb25zdCBzdGF0cyA9IHN0YXRTeW5jKGZpbGVQKTtcbi8vICAgICBjb25zdCBpc0ZpbGUgPSBzdGF0cy5pc0ZpbGUoKTtcbi8vICAgICBjb25zdCBpc0RpciA9IHN0YXRzLmlzRGlyZWN0b3J5KCk7XG4vLyAgICAgaWYgKGlzRmlsZSkge1xuLy8gICAgICAgcGluaWFTdG9yZUtleXMucHVzaChwYXRoLmJhc2VuYW1lKGZpbGVQLCAnLnRzJykpO1xuLy8gICAgIH1cbi8vICAgICBpZiAoaXNEaXIpIHtcbi8vICAgICAgIGZpbGVSZWN1cnNpb24oZmlsZVApO1xuLy8gICAgIH1cbi8vICAgfSk7XG4vLyB9XG4vLyBmaWxlUmVjdXJzaW9uKHJlc29sdmVQYXRoKF9fZGlybmFtZSwgJy4uL3NyYy9zdG9yZS9tb2R1bGVzJykpO1xuXG5jb25zdCBmaWxlcyA9IGZnLmdsb2JTeW5jKCdzcmMvc3RvcmUvbW9kdWxlcy8qLnRzJykgLy8gXHU1RjUzXHU1MjREXHU1REU1XHU0RjVDXHU3NkVFXHU1RjU1XHU0RTNBXHU2ODM5XHU3NkVFXHU1RjU1XG5cbmZpbGVzLmZvckVhY2goKHApID0+IHtcbiAgcGluaWFTdG9yZUtleXMucHVzaChwYXRoLmJhc2VuYW1lKHAsICcudHMnKSlcbn0pXG5cbmNvbnN0IGN1c3RvbWVySW1wb3J0ID0ge31cblxuLy8gXHU4MUVBXHU1MkE4XHU1RjE1XHU1MTY1cGluaWFcdTc2ODRzdG9yZVxucGluaWFTdG9yZUtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gIGN1c3RvbWVySW1wb3J0W2BAL3N0b3JlL21vZHVsZXMvJHtrZXl9YF0gPSBbXG4gICAgWydkZWZhdWx0JywgYHVzZSR7Zmlyc3RVcHBlckNhc2Uoa2V5KX1TdG9yZWBdLFxuICBdXG59KVxuZXhwb3J0IGRlZmF1bHQgY3VzdG9tZXJJbXBvcnRcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW9sYW5cXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFx2aXRlLXZ1ZS10c1xcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW9sYW5cXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFx2aXRlLXZ1ZS10c1xcXFxidWlsZFxcXFx1dGlscy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW9sYW4vRG9jdW1lbnRzL0dpdEh1Yi92aXRlLXZ1ZS10cy9idWlsZC91dGlscy50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmZ1bmN0aW9uIGZpcnN0VXBwZXJDYXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxufVxuXG5mdW5jdGlvbiByZXNvbHZlUGF0aChkaXJuYW1lOiBzdHJpbmcsIHA6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwYXRoLnJlc29sdmUoZGlybmFtZSwgcClcbn1cblxuZXhwb3J0IHsgZmlyc3RVcHBlckNhc2UsIHJlc29sdmVQYXRoIH1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW9sYW5cXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFx2aXRlLXZ1ZS10c1xcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW9sYW5cXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFx2aXRlLXZ1ZS10c1xcXFxidWlsZFxcXFxvdXRwdXQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FvbGFuL0RvY3VtZW50cy9HaXRIdWIvdml0ZS12dWUtdHMvYnVpbGQvb3V0cHV0LnRzXCI7LyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbmNvbnN0IGFyY29WdWVVdGlsc1JlID0gL25vZGVfbW9kdWxlc1tcXFxcL11yZXNpemUtb2JzZXJ2ZXItcG9seWZpbGxbXFxcXC9dKC4qKVxcLmpzJC8gLy8gYXJjb1Z1ZSBcdTc2ODRcdTRFMDBcdTRFOUJcdTRGOURcdThENTZcdTUzMDVcbmNvbnN0IGFyY29WdWVPbkRlbWFuZFJFID1cbiAgL25vZGVfbW9kdWxlc1tcXFxcL11AYXJjby1kZXNpZ25bXFxcXC9dKC4qKVxcLihtP2pzfGNzc3xzY3NzfHNhc3N8anNvbikkL1xuY29uc3QgdmVuZG9yUkUgPSBbXG4gIC9ub2RlX21vZHVsZXNbXFxcXC9dKEB2dWV8dnVlLXJvdXRlcnx2dWUtaTE4bnxwaW5pYXxwaW5pYS1wbHVnaW4tcGVyc2lzdGVkc3RhdGUpW1xcXFwvXSguKilcXC4obT9qc3xjc3N8c2Nzc3xzYXNzfGpzb24pJC8sXG4gIC92aXJ0dWFsOnN2Zy1pY29ucy1yZWdpc3Rlci8sXG4gIC9wbHVnaW4tdnVlOmV4cG9ydC1oZWxwZXIvLFxuICAvdml0ZVtcXFxcL11wcmVsb2FkLWhlbHBlci8sXG4gIC92aXRlW1xcXFwvXW1vZHVsZXByZWxvYWQtcG9seWZpbGwvLFxuXVxuXG5mdW5jdGlvbiBtYW51YWxDaHVua3MoaWQpOiBzdHJpbmcge1xuICBpZiAoYXJjb1Z1ZVV0aWxzUmUudGVzdChpZCkpIHtcbiAgICAvLyBcdTUxRTBcdTRFNEVcdTRFMERcdTRGMUFcdTUzRDhcdTY2RjRcbiAgICByZXR1cm4gJ2FyY29WdWVVdGlscydcbiAgfVxuICBpZiAoYXJjb1Z1ZU9uRGVtYW5kUkUudGVzdChpZCkpIHtcbiAgICAvLyBcdTYzMDlcdTk3MDBcdTYyNTNcdTUzMDVcdUZGMENcdTY3MDlcdTUzRUZcdTgwRkRcdTY3MDlcdTY1QjBcdTc2ODRcdTdFQzRcdTRFRjZcdTYyNTNcdTUzMDVcdThGREJcdTY3NjVcbiAgICByZXR1cm4gJ2FyY29WdWVPbkRlbWFuZCdcbiAgfVxuICBpZiAodmVuZG9yUkUuc29tZSgocikgPT4gci50ZXN0KGlkKSkpIHtcbiAgICAvLyBcdTUxRTBcdTRFNEVcdTRFMERcdTRGMUFcdTUzRDhcdTY2RjRcbiAgICByZXR1cm4gJ3ZlbmRvcidcbiAgfVxufVxuXG5mdW5jdGlvbiBjaHVua0ZpbGVOYW1lcygpOiBzdHJpbmcge1xuICByZXR1cm4gJ2NodW5rL1tuYW1lXS1baGFzaF0uanMnXG59XG5cbmZ1bmN0aW9uIGFzc2V0RmlsZU5hbWVzKGFzc2V0SW5mbyk6IHN0cmluZyB7XG4gIHJldHVybiAnYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nXG59XG5cbmV4cG9ydCB7IG1hbnVhbENodW5rcywgY2h1bmtGaWxlTmFtZXMsIGFzc2V0RmlsZU5hbWVzIH1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsU0FBNEIsb0JBQW9CO0FBRS9XLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sZ0JBQWdCOzs7QUNMc1UsT0FBT0EsV0FBVTtBQUM5VyxPQUFPLFFBQVE7OztBQ0R3VCxPQUFPLFVBQVU7QUFFeFYsU0FBUyxlQUFlLEtBQXFCO0FBQzNDLFNBQU8s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
