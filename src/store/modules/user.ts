import { user } from '@/api/sys';
import { type RouteRecordRaw } from 'vue-router';
import allRoutes from '@/constant/routes';

function getRouterIdsFromBack(menu: []): string[] {
  const arr: string[] = [];
  const fn: (list: [])=> void = (list) => {
    list.forEach((item: any) => {
      if (item.id !== undefined) {
        arr.push(item.id);
      }
      if (Array.isArray(item.children) && item.children.length > 0) {
        fn(item.children);
      }
    });
  };
  fn(menu);
  return arr;
}

function filterRouters(menu: []): RouteRecordRaw[] {
  const ids = getRouterIdsFromBack(menu);
  const fn: (arr: RouteRecordRaw[], parent: RouteRecordRaw | null)=> RouteRecordRaw[] = (arr, parent) => {
    return arr.filter(item => {
      if (item.children !== undefined) {
        item.children = fn(item.children, item);
      }
      const boolean = (item.children === undefined || item.children.length > 0) && (item.meta?.id === undefined || ids.includes(item.meta?.id));
      if (boolean && parent !== null && item.children !== undefined) {
        parent.redirect = { name: item.children[0].name };
      }
      return boolean;
    });
  };
  return fn(allRoutes, null);
}

export default defineStore('user', () => {
  const token = ref('');
  const routersRaw: Ref<RouteRecordRaw[]> = ref([]);
  const auth = ref([]);
  const allAuth = ref([]);

  function getRoutersAndAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      $api(user).then(({ data }) => {
        const result = data.value?.result;
        if (result === undefined) {
          reject();
        } else {
          routersRaw.value = filterRouters(result.menu);
          debugger;
          auth.value = result.auth;
          allAuth.value = result.allAuth;
          resolve(result);
        }
      });
    });
  }

  return {
    token,
    routersRaw,
    auth,
    allAuth,
    getRoutersAndAuth,
  };
}, {
  persist: {
    paths: [
      'token',
    ],
  },
});
