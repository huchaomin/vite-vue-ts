/*
 * @Author       : error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date         : 2023-09-27 17:30:46
 * @LastEditors  : error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime : 2023-09-27 18:30:58
 * @Description  :
 */
import Router from '@/router'
import Store from '@/store'
import App from './App.vue'
import SvgIcon from '@/plugins/svgIcon'
import vuetify from '@/plugins/vuetify'
import vxeTable from '@/plugins/vxe-table'
import '@/assets/css/main.scss'

createApp(App)
  .use(Router)
  .use(Store)
  .use(vuetify)
  .use(vxeTable)
  .component('SvgIcon', SvgIcon)
  .mount('#app')
