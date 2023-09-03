import { type UnwrapNestedRefs, type Raw } from 'vue'
import { type PropsType as DialogPropsType } from '@/components/global/CDialog.vue'

interface AllowRefPropsType<T extends new () => ComponentPublicInstance> {
  dialogProps: AllowRefValue<DialogPropsType>
  componentProps: AllowRefValue<InstanceType<T>['$props']>
}

interface MapValueType<T extends new () => ComponentPublicInstance> {
  dialogProps: UnwrapNestedRefs<AllowRefPropsType<T>['dialogProps']>
  component: Raw<T>
  componentProps: UnwrapNestedRefs<AllowRefPropsType<T>['componentProps']>
  componentRef: NonNullable<VNode['component']>['exposed'] | null
}

export default defineStore('dialog', <
  T extends new () => ComponentPublicInstance,
>() => {
  const collection = reactive<Map<string, MapValueType<T>>>(new Map())

  function add(
    dialogProps: Omit<AllowRefPropsType<T>['dialogProps'], 'modelValue'>,
    component: T,
    componentProps: AllowRefPropsType<T>['componentProps'],
  ): MapValueType<T>['componentRef'] {
    const dialogId = _.uniqueId('dialog_')
    const componentRef = ref(null)
    collection.set(dialogId, {
      dialogProps: reactive({
        ...dialogProps,
        modelValue: true,
      }),
      component: markRaw(component),
      componentProps: reactive(componentProps),
      componentRef,
    })
    return componentRef
  }

  function update(value: boolean, id: string): void {
    collection.get(id)!.dialogProps.modelValue = value
    if (!value) {
      setTimeout(() => {
        collection.delete(id)
      }, 2000) // 等待动画结束
    }
  }

  function setComponentRef(id: string, vnode: VNode): void {
    collection.get(id)!.componentRef = vnode.component?.exposed ?? null
  }

  function deleteComponentRef(id: string): void {
    collection.get(id)!.componentRef = null
  }

  return {
    collection,
    add,
    update,
    setComponentRef,
    deleteComponentRef,
  }
})
