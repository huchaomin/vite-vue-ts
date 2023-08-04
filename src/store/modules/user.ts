import { user } from '@/api/sys';

export default defineStore('user', () => {
  const token = ref('');
  const menu = ref([]);
  const auth = ref([]);
  const allAuth = ref([]);

  function getMenuAndAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      $api(user).then(({ data }) => {
        const result = data.value;
        if (result === null) {
          reject();
        } else {
          menu.value = result.menu;
          auth.value = result.auth;
          allAuth.value = result.allAuth;
          resolve(result);
        }
      });
    });
  }

  return {
    token,
    menu,
    auth,
    allAuth,
    getMenuAndAuth,
  };
}, {
  persist: {
    paths: [
      'token',
    ],
  },
});
