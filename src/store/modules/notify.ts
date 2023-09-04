import { type optionsConfig } from '@/plugins/autoImport/$notify.ts'
export default defineStore('notify', () => {
  const collection = ref<Map<string, optionsConfig>>(new Map())
  function add(options: optionsConfig): void {
    const notificationId = _.uniqueId('notification_')
    const timeout = options.timeout
    delete options.timeout
    collection.value.set(notificationId, options)
    setTimeout(() => {
      remove(notificationId)
    }, timeout)
  }

  function remove(notificationId: string): void {
    collection.value.delete(notificationId)
  }
  return {
    collection,
    add,
  }
})
