import '@/assets/css/main.less';
import Router from '@/router';
import Store from '@/store';
import App from './App.vue';

createApp(App)
  .use(Router)
  .use(Store)
  .mount('#app');
