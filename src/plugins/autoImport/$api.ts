import {
  createFetch,
} from '@vueuse/core';
import router from '@/router';
import { setUrlPrefix } from '@/utils/url';

let isExpiration = false; // 登陆是否已经过期
const whiteApis = ['/login']; // 接口白名单
type dataType = Record<string, any> | undefined;

function handleUrlAndData(url: string, data: dataType = {}, method: string): string {
  let query = '?';
  Object.keys(data).forEach((key) => {
    const reg = new RegExp(`\\{${key}\\}`, 'g');
    if (reg.test(url)) {
      url = url.replace(reg, encodeURIComponent(data[key]));
      delete data[key];
    } else if (method === 'get') {
      query += `${key}=${encodeURIComponent(data[key])}&`;
    }
  });
  if (query !== '?') {
    query = query.slice(0, -1);
    url += query;
  }
  return setUrlPrefix(url);
}

interface apiConfig {
  readonly url: string
  readonly method?: string
  readonly timeout?: number
  readonly mode?: string // 请求模式,允许跨域请求
  readonly credentials?: string // 是否携带cookie
  readonly immediate?: boolean // 是否立即执行
  readonly loading?: boolean // 是否显示loading
}

export default function fetchWrapper(
  defaultConfig: apiConfig,
  data?: dataType,
  CustomerConfig?: Omit<apiConfig, 'url' | 'method'>,
): any {
  const config = {
    ...defaultConfig,
    ...CustomerConfig,
  };
  const {
    url,
    method = 'get',
    timeout = 10000,
    mode = 'cors',
    credentials = 'same-origin',
    immediate = true,
    loading = true,
  } = config;
  const processedUrl = handleUrlAndData(url, data, method); // data 也改变了
  const userStore = useUserStore();
  const fetch = createFetch({
    options: {
      timeout,
      immediate,
      async beforeFetch({ url, options, cancel }) {
        if (loading) {
          $loading.show();
        }
        if (!whiteApis.find((item) => url.includes(item)) && isExpiration) {
          cancel();
        }
        if (userStore.token) {
          options.headers = {
            ...options.headers ?? {},
            'X-Access-Token': userStore.token,
          };
        }
        return { options };
      },
      // data response 40*,20* 只走了这里
      // data.value 为 object
      afterFetch(ctx) {
        if (loading) {
          $loading.hide();
        }
        const { data, response } = ctx;
        if (response.ok && Boolean(data?.success)) { // 该项目要data.success，其他项目可能不需要
          return ctx;
        }

        switch (data.code) {
          case 403:
            $notify.error('拒绝访问', { title: '系统提示' });
            break;
          case 404:
            $notify.error('很抱歉，资源未找到!', { title: '系统提示' });
            break;
          case 401:
            if (!isExpiration) {
              $notify.error('很抱歉，登录已过期，请重新登录', { title: '系统提示' });
            }
            isExpiration = true;
            userStore.token = '';
            // TODO 啥时候清除store缓存
            router.push({
              name: 'login',
            });
            break;
          default:
            $notify.error(data.message, { title: '系统提示' });
            break;
        }
        return { data: null, response };
      },
      // 500、接口地址错误（net::ERR_CONNECTION_REFUSED） 只走了这里
      // data.value 为 null
      onFetchError(ctx) {
        if (loading) {
          $loading.hide();
        }
        $notify.error('网络错误');
        return ctx;
      },
    },
    fetchOptions: {
      method,
      mode: mode as RequestMode,
      credentials: credentials as RequestCredentials,
    },
  });
  if (method === 'get') {
    return fetch(processedUrl).json();
  } else if (method === 'post') {
    return fetch(processedUrl).post(data).json(); // TODO 看看怎么传参 method 已经在上面定义
  }
}
