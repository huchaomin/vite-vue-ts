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
