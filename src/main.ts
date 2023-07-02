import '@/assets/css/main.less';
import Router from '@/router';
import Store from '@/store';
import App from './App.vue';
import SvgIcon from '@/plugins/svgIcon';

createApp(App)
  .use(Router)
  .use(Store)
  .component('SvgIcon', SvgIcon)
  .mount('#app');
