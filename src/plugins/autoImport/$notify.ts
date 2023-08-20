enum NotificationTypes {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

interface optionsConfig {
  title?: string
  text?: string
  type?: NotificationTypes
  timeout?: number
}

type createFn = (text: string, options?: optionsConfig) => void

type createMap = {
  // 映射类型和函数类型不能写在一起
  [key in NotificationTypes]: createFn
}

const create: createFn = (
  text,
  {
    type = NotificationTypes.success,
    title = '提示',
    timeout = 3000,
    ...options
  } = {},
) => {
  const notifyStore = useNotifyStore()
  notifyStore.addNotification({
    text,
    type,
    title,
    timeout,
    ...options,
  })
}

Object.values(NotificationTypes).forEach((type) => {
  ;(create as unknown as createMap)[type] = (text, options = {}) => {
    create(text, {
      type,
      ...options,
    })
  }
})
export default create as createFn & createMap

export type { optionsConfig }
