/* eslint-disable consistent-return */
const arcoVueUtilsRe = /node_modules[\\/]resize-observer-polyfill[\\/](.*)\.js$/; // arcoVue 的一些依赖包
const arcoVueOnDemandRE = /node_modules[\\/]@arco-design[\\/](.*)\.(m?js|css|scss|sass|json)$/;
const vendorRE = [
  /node_modules[\\/](@vue|vue-router|vue-i18n|axios|pinia|pinia-plugin-persistedstate)[\\/](.*)\.(m?js|css|scss|sass|json)$/,
  /virtual:svg-icons-register/,
  /plugin-vue:export-helper/,
  /vite[\\/]preload-helper/,
  /vite[\\/]modulepreload-polyfill/,
];

function manualChunks(id) :string {
  if (arcoVueUtilsRe.test(id)) { // 几乎不会变更
    return 'arcoVueUtils';
  }
  if (arcoVueOnDemandRE.test(id)) { // 按需打包，有可能有新的组件打包进来
    return 'arcoVueOnDemand';
  }
  if (vendorRE.some((r) => r.test(id))) { // 几乎不会变更
    return 'vendor';
  }
}

function chunkFileNames() :string {
  return 'chunk/[name]-[hash].js';
}

function assetFileNames(assetInfo) :string {
  return 'assets/[name]-[hash][extname]';
}

export {
  manualChunks,
  chunkFileNames,
  assetFileNames,
};
