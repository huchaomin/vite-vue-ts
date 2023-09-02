import { type Component, type UnwrapNestedRefs, type Raw } from 'vue'
import { type PropsType as DialogPropsType } from '@/components/global/CDialog.vue'

interface Options {
  dialogProps: AllowRefValue<DialogPropsType>
  component: Component
  componentProps: Record<string, unknown>
}

export default defineStore('dialog', () => {
  const collection = ref<
    Map<
      string,
      {
        dialogProps: UnwrapNestedRefs<AllowRefValue<DialogPropsType>>
        component: Raw<Options['component']>
        componentProps: UnwrapNestedRefs<Options['componentProps']>
      }
    >
  >(new Map())
  function add(
    dialogProps: Omit<Options['dialogProps'], 'modelValue'>,
    component: Options['component'],
    componentProps: Options['componentProps'],
  ): void {
    const dialogId = _.uniqueId('dialog_')
    collection.value.set(dialogId, {
      dialogProps: reactive({
        ...dialogProps,
        modelValue: true,
      }),
      component: markRaw(component),
      componentProps: reactive(componentProps),
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
