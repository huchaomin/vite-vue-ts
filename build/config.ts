/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-25 15:56:06
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-09-25 16:16:46
 * @Description  :
 */
export default {
  zg: {
    appName: '擎峰资产处置平台',
    apiPrefix: 'qczn-work',
    // proxyTarget: 'http://192.168.2.206:8899/', // 测试环境地址
    proxyTarget: 'http://192.168.2.87:7899/', // 测试环境地址（晓蕾）
    // proxyTarget: 'http://192.168.2.215:8899/', // 测试环境地址（明浩）
  },
  pg: {
    appName: '擎聪资产定价平台',
    apiPrefix: 'jeecg-boot',
    proxyTarget: 'http://192.168.2.208:9089/', // 开发环境地址
    // proxyTarget: 'http://192.168.2.206:9089/', // 测试环境地址
    // proxyTarget: 'http://218.17.157.16:9089/', // 生产环境地址
    // proxyTarget: 'http://192.168.2.87:7899/', // 测试环境地址（晓蕾）
    // proxyTarget: 'http://192.168.2.211:8080/', // 测试环境地址（Robin）
  },
}
