import { createFetch } from '@vueuse/core';
import router from '@/router';
import { setUrlPrefix } from '@/utils/url';

let isExpiration = false; // 登陆是否已经过期
const whiteApis = ['/login']; // 接口白名单

function handleUrlAndData(url: string, data: Record<string, any> = {}, method: string): string {
  let query = '?';
  Object.keys(data).forEach((key) => {
    const reg = new RegExp(`\\$\\{${key}\\}`, 'g');
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
}

export default function fetchWrapper(
  defaultConfig: apiConfig,
  data?: Record<string, any>,
  CustomerConfig?: apiConfig,
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
  } = config;
  const processedUrl = handleUrlAndData(url, data, method);
  const userStore = useUserStore();
  const fetch = createFetch({
    options: {
      timeout,
      async beforeFetch({ url, options, cancel }) {
        if (!whiteApis.find((item) => url.includes(item)) && isExpiration) {
          cancel();
        }
        if (userStore.token) {
          options.headers = {
            ...options.headers,
            Authorization: userStore.token,
          };
        }
        return { options };
      },
      afterFetch(ctx) {
        const { data } = ctx;
        const status = data.code;
        if (status === 401) {
          if (!isExpiration) {
            // TODO ElMessage.error('登录过期，请重新登录');
          }
          isExpiration = true;
          userStore.token = '';
          // TODO 啥时候清除store缓存
          router.push({
            name: 'login',
          });
        }
        return ctx; // TODO 试试返回对象
      },
      // 请求错误
      onFetchError(ctx) {
        console.error(ctx.error);
        return ctx;
      },
    },
    fetchOptions: {
      mode: mode as RequestMode,
      credentials: credentials as RequestCredentials,
    },
  });
  if (method === 'get') {
    return fetch(processedUrl).json();
  } else if (method === 'post') {
    return fetch(processedUrl).post(data).json();
  }
}

// 使用示例
// const { onFetchResponse } = fetchWrapper({
//   url: 'https://httpbin.org/get',
// });

// onFetchResponse((res: any) => { // 只有Response这一个参数
//   console.log(res);
//   // body: ReadableStream
//   // bodyUsed: true
//   // headers: Headers {}
//   // ok: true
//   // redirected: false
//   // status: 200
//   // statusText: ""
//   // type: "cors"
//   // url: "https://httpbin.org/get"
//   // [[Prototype]]: Response
// });

// onFetchError((error) => { // 只有error这一个参数
//   console.log(error);
// });
