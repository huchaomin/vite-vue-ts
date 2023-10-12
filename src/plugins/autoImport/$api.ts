/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-17 08:55:35
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-12 11:20:20
 * @Description  :
 */
import { type UseFetchReturn, type UseFetchOptions, createFetch } from '@vueuse/core'
import { setUrlPrefix } from '@/utils/url'
import signMd5Utils from '@/utils/signMd5Utils.js'

let isExpiration = false // 登陆是否已经过期
type DataType = Record<string, any> | undefined
type MethodType = 'get' | 'post' | 'put' | 'delete'

function handleUrlAndData(
  url: string,
  data: DataType = {},
  method: MethodType,
  filterEmptyParams: boolean,
): string {
  let query = '?'
  Object.keys(data).forEach((key) => {
    if (filterEmptyParams) {
      if (['', null, undefined].includes(data[key])) {
        delete data[key]
        return
      }
    }
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

export interface apiConfig {
  readonly url: string
  readonly method?: MethodType
  readonly timeout?: number
  readonly mode?: RequestMode // 请求模式,允许跨域请求
  readonly credentials?: RequestCredentials // 是否携带cookie
  readonly immediate?: boolean // 是否立即执行
  readonly loading?: boolean // 是否显示loading
  readonly isWhiteApi?: boolean // 是否是白名单接口（不需要登陆）
  readonly responseType?: string // 返回数据类型
  readonly headers?: Record<string, string> // 请求头
  readonly msgOnSuccess?: boolean // 成功提示
  readonly msgOnError?: boolean // 失败提示
  readonly useDataResult?: boolean // 是否使用data.result
  readonly filterEmptyParams?: boolean // 过滤空参数
}

type ctxType =
  | Parameters<NonNullable<UseFetchOptions['afterFetch']>>[0]
  | Parameters<NonNullable<UseFetchOptions['onFetchError']>>[0]

function toLogin(title: string): void {
  const userStore = useUserStore()
  if (!isExpiration) {
    $notify.error('很抱歉，登录已过期，请重新登录', { title })
  }
  isExpiration = true
  userStore.clearSession()
}

// 有的公司比较奇葩 200 的相应，data.code 为40*
function errHandler(ctx: ctxType, msgOnError: boolean): void {
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
      toLogin(title)
      break
    default:
      if (data?.status === 500 && data.message === 'Token失效，请重新登录') {
        toLogin(title)
      } else if (msgOnError) {
        $notify.error(data?.message ?? '网络错误', { title })
      }
      break
  }
}

export default function fetchWrapper(
  defaultConfig: apiConfig,
  data?: DataType,
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
    msgOnError = true,
    msgOnSuccess = false,
    useDataResult = true,
    filterEmptyParams = true,
  } = config
  const processedUrl = handleUrlAndData(url, data, method, filterEmptyParams) // data 也改变了
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
          if (msgOnSuccess) {
            $notify(data.message)
          }
          return {
            data: useDataResult ? data.result ?? data : data,
          }
        }
        throw new Error() // 这里抛出错误，会被 onFetchError 捕获
      },
      onFetchError(ctx) {
        if (loading) {
          $loading.hide()
        }
        errHandler(ctx, msgOnError)
        return { data: null, error: ctx.data }
      },
    },
    fetchOptions: {
      mode,
      credentials,
    },
  })
  const res = fetch(processedUrl)[method](method === 'get' ? undefined : data)
  if (responseType === 'json') {
    return res.json()
  } else {
    return res.blob()
  }
}
