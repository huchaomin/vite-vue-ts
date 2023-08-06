import { type optionsConfig } from '@/plugins/autoImport/$notify.ts'
export default defineStore('notify', () => {
  const notifications = ref<Map<string, optionsConfig>>(new Map())
  function addNotification(options): void {
    const notificationId = self.crypto.randomUUID()
    const timeout = options.timeout
    delete options.timeout
    notifications.value.set(notificationId, options)
    setTimeout(() => {
      removeNotification(notificationId)
    }, timeout)
  }

  function removeNotification(notificationId: string): void {
    notifications.value.delete(notificationId)
  }
  return {
    notifications,
    addNotification,
  }
})
