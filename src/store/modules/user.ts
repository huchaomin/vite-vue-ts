import { user } from '@/api/sys';

export default defineStore('user', () => {
  const token = ref('');
  const menu = ref([]);

  function getUserInfo(): PromiseLike<any> {
    return $api(user).then(({ data }) => {
      if (data.value !== null) {
        // return Promise.resolve(data.value);
      } else {
        // return Promise.reject();
      }
    });
  }

  return {
    token,
    menu,
    getUserInfo,
  };
}, {
  persist: {
    paths: [
      'token',
      'menu',
    ],
  },
});
