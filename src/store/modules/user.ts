// import { user } from '@/api/sys';

export default defineStore('common', () => {
  const token = ref('');
  const menu = ref([]);

  function getUserInfo(): void {
    // return $api(user).then(res => {
    //   if (res)
    // })
    // if (data.value) {
    //   return await Promise.resolve(data.value);
    // } else {
    //   return await Promise.reject();
    // }
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
