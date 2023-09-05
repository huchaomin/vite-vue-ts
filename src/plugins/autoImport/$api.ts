import {
  type UseFetchReturn,
  type UseFetchOptions,
  createFetch,
} from '@vueuse/core'
import { setUrlPrefix } from '@/utils/url'
import signMd5Utils from '@/utils/signMd5Utils.js'

let isExpiration = false // 登陆是否已经过期
type dataType = Record<string, any> | undefined

function handleUrlAndData(
  url: string,
  data: dataType = {},
  method: string,
): string {
  let query = '?'
  Object.keys(data).forEach((key) => {
    const reg = new RegExp(`\\{${key}\\}`, 'g')
    if (reg.test(url)) {
      url = url.replace(reg, data[key]) // 这里就不需要编码了，这里不属于参数，请后端同学规范接口传参
      delete data[key]
    } else if (method === 'get') {
      query += `${key}=${encodeURIComponent(data[key])}&`
    }
  })
  if (query !== '?') {
    query = query.slice(0, -1)
    url += query
  }
  return setUrlPrefix(url)
}

interface apiConfig {
  readonly url: string
  readonly method?: string
  readonly timeout?: number
  readonly mode?: RequestMode // 请求模式,允许跨域请求
  readonly credentials?: RequestCredentials // 是否携带cookie
  readonly immediate?: boolean // 是否立即执行
  readonly loading?: boolean // 是否显示loading
  readonly isWhiteApi?: boolean // 是否是白名单接口（不需要登陆）
  readonly responseType?: string // 返回数据类型
  readonly headers?: Record<string, string> // 请求头
}

type ctxType =
  | Parameters<NonNullable<UseFetchOptions['afterFetch']>>[0]
  | Parameters<NonNullable<UseFetchOptions['onFetchError']>>[0]

// 有的公司比较奇葩 200 的相应，data.code 为40*
function errHandler(ctx: ctxType): void {
  const userStore = useUserStore()
  const { data } = ctx // data 可能为null
  const title = '系统提示'
  switch (data?.code) {
    case 403:
      $notify.error('拒绝访问', { title })
      break
    case 404:
      $notify.error('很抱歉，资源未找到!', { title })
      break
    case 401:
      if (!isExpiration) {
        $notify.error('很抱歉，登录已过期，请重新登录', { title })
      }
      isExpiration = true
      userStore.clearSession()
      break
    default:
      $notify.error(data?.message ?? '网络错误', { title })
      break
  }
}

export default function fetchWrapper(
  defaultConfig: apiConfig,
  data?: dataType,
  CustomerConfig?: Omit<apiConfig, 'url' | 'method' | 'isWhiteApi'>,
): UseFetchReturn<any> & PromiseLike<UseFetchReturn<any>> {
  const config = {
    ...defaultConfig,
    ...CustomerConfig,
  }
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
    headers = {},
  } = config
  const processedUrl = handleUrlAndData(url, data, method) // data 也改变了
  const userStore = useUserStore()
  const fetch = createFetch({
    options: {
      timeout,
      immediate,
      async beforeFetch({ options, cancel }) {
        if (loading) {
          $loading.show()
        }
        const signHeader: Record<string, string> = {
          'X-Sign': signMd5Utils.getSign(url, data),
          'X-TIMESTAMP': signMd5Utils.getDateTimeToString(),
        }
        if (userStore.token) {
          isExpiration = false
          signHeader['X-Access-Token'] = userStore.token
        }
        options.headers = {
          ...(options.headers ?? {}),
          ...signHeader,
          ...headers,
        }
        // 非白名单接口，且登陆已过期直接取消请求
        if (!isWhiteApi && isExpiration) {
          cancel()
        }
        return { options }
      },
      // response.ok 为 true 求的状态码 200 到 299
      afterFetch(ctx) {
        const { data } = ctx
        if (
          (responseType === 'json' && Boolean(data?.success)) ||
          (responseType === 'blob' && data?.size > 0)
        ) {
          // 该项目要data.success，其他项目可能不需要
          if (loading) {
            $loading.hide()
          }
          return ctx
        }
        throw new Error() // 这里抛出错误，会被 onFetchError 捕获
      },
      onFetchError(ctx) {
        if (loading) {
          $loading.hide()
        }
        errHandler(ctx)
        return { data: null, response: ctx.response }
      },
    },
    fetchOptions: {
      mode,
      credentials,
    },
  })
  const res =
    method === 'get' ? fetch(processedUrl) : fetch(processedUrl).post(data) // 暂时只有这两个请求方法
  if (responseType === 'json') {
    return res.json()
  } else {
    return res.blob()
  }
}
