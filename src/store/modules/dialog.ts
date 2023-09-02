import { type Component } from 'vue'
import { type PropsType as DialogPropsType } from '@/components/global/CDialog.vue'

interface Options {
  component: Component
  componentProps: Record<string, unknown> // TODO 能不能取到传进来的组件的props类型
  dialogProps: DialogPropsType
}

export default defineStore('dialog', () => {
  const collection = ref<Map<string, Options>>(new Map())
  function add(
    component: Options['component'],
    componentProps: Options['componentProps'],
    dialogProps: Omit<Options['dialogProps'], 'modelValue'>,
  ): void {
    const dialogId = _.uniqueId('dialog_')
    collection.value.set(dialogId, {
      component: markRaw(component),
      componentProps,
      dialogProps: {
        ...dialogProps,
        modelValue: true,
      },
    })
  }

  function update(value: boolean, id: string): void {
    collection.value.get(id)!.dialogProps.modelValue = value
    if (!value) {
      setTimeout(() => {
        collection.value.delete(id)
      }, 2000) // 等待动画结束
    }
  }
  return {
    collection,
    add,
    update,
  }
})
