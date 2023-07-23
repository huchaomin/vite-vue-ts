import '@/assets/css/main.less';
import Router from '@/router';
import Store from '@/store';
import App from './App.vue';
import SvgIcon from '@/plugins/svgIcon';
import vuetify from '@/plugins/vuetify';

createApp(App)
  .use(Router)
  .use(Store)
  .use(vuetify)
  .component('SvgIcon', SvgIcon)
  .mount('#app');
