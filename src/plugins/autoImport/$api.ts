import {
  type UseFetchReturn,
  createFetch,
} from '@vueuse/core';
import router from '@/router';
import { setUrlPrefix } from '@/utils/url';
import signMd5Utils from '@/utils/signMd5Utils.js';

let isExpiration = false; // 登陆是否已经过期
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
  readonly isWhiteApi?: boolean // 是否是白名单接口（不需要登陆）
  readonly responseType?: string // 返回数据类型
}

export default function fetchWrapper(
  defaultConfig: apiConfig,
  data?: dataType,
  CustomerConfig?: Omit<apiConfig, 'url' | 'method' | 'isWhiteApi'>,
): UseFetchReturn<any> & PromiseLike<UseFetchReturn<any>> {
  const config = {
    ...defaultConfig,
    ...CustomerConfig,
  };
  const {
    url,
    method = 'get',
    isWhiteApi = false,
    timeout = 15000,
    mode = 'cors',
    credentials = 'same-origin',
    immediate = true,
    loading = true,
    responseType = 'json',
  } = config;
  const processedUrl = handleUrlAndData(url, data, method); // data 也改变了
  const userStore = useUserStore();
  const fetch = createFetch({
    options: {
      timeout,
      immediate,
      async beforeFetch({ options, cancel }) {
        if (loading) {
          $loading.show();
        }
        if (!isWhiteApi && isExpiration) {
          cancel();
        }
        const signHeader: Record<string, string> = {
          'X-Sign': signMd5Utils.getSign(url, data),
          'X-TIMESTAMP': signMd5Utils.getDateTimeToString(),
        };
        if (userStore.token) {
          signHeader['X-Access-Token'] = userStore.token;
        }
        options.headers = {
          ...options.headers ?? {},
          ...signHeader,
        };
        return { options };
      },
      // data response 20* 只走了这里
      // data.value 为 object
      afterFetch(ctx) {
        if (loading) {
          $loading.hide();
        }
        const { data, response } = ctx;
        if (response.ok) {
          if (responseType === 'json' && Boolean(data?.success)) { // 该项目要data.success，其他项目可能不需要
            return ctx;
          }
          if (responseType === 'blob' && data?.size > 0) {
            return ctx;
          }
        }
        $notify.error('网络错误');
        return { data: null, response };
      },
      // 401,500、接口地址错误（net::ERR_CONNECTION_REFUSED） 只走了这里
      // data.value 为 null
      onFetchError(ctx) {
        if (loading) {
          $loading.hide();
        }
        const { data } = ctx;
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
        return ctx;
      },
    },
    fetchOptions: {
      method,
      mode: mode as RequestMode,
      credentials: credentials as RequestCredentials,
    },
  });
  const res = method === 'get' ? fetch(processedUrl) : fetch(processedUrl).post(data); // 暂时只有这两个请求方法 // TODO 看看怎么传参 method 已经在上面定义
  if (responseType === 'json') {
    return res.json();
  } else {
    return res.blob();
  }
}
