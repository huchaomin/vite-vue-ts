import { type UnwrapNestedRefs, type Raw } from 'vue'
import type CDialog from '@/components/global/CDialog.vue'

interface BasePropsEmitsType<T extends new () => ComponentPublicInstance> {
  dialogProps: AllowRefValue<InstanceType<typeof CDialog>['$props']>
  dialogEmits: Partial<InstanceType<typeof CDialog>['$emit']>
  componentProps: AllowRefValue<InstanceType<T>['$props']>
  componentEmits: Partial<InstanceType<T>['$emit']>
}

type exposedRefType = NonNullable<VNode['component']>['exposed'] | null

interface MapValueType<T extends new () => ComponentPublicInstance> {
  dialogPE: UnwrapNestedRefs<
    Omit<BasePropsEmitsType<T>['dialogProps'], 'modelValue'> &
      BasePropsEmitsType<T>['dialogEmits'] & {
        modelValue: boolean
      }
  >
  component: Raw<T>
  componentPE: UnwrapNestedRefs<
    BasePropsEmitsType<T>['componentProps'] &
      BasePropsEmitsType<T>['componentEmits']
  > | null
  componentRef: exposedRefType
  dialogRef: exposedRefType
}

export type addType<T extends new () => ComponentPublicInstance> = (
  dialogPE: Omit<BasePropsEmitsType<T>['dialogProps'], 'modelValue'> &
    BasePropsEmitsType<T>['dialogEmits'],
  component: T,
  componentPE?: BasePropsEmitsType<T>['componentProps'] &
    BasePropsEmitsType<T>['componentEmits'],
) => {
  componentRef: MapValueType<T>['componentRef']
  dialogRef: MapValueType<T>['dialogRef']
}

export default defineStore('dialog', <
  T extends new () => ComponentPublicInstance,
>() => {
  const collection = reactive<Map<string, MapValueType<T>>>(new Map())

  const add: addType<T> = (dialogPE, component, componentPE) => {
    const dialogId = _.uniqueId('dialog_')
    const componentRef = ref(null)
    const dialogRef = ref(null)
    collection.set(dialogId, {
      dialogPE: reactive({
        modelValue: true,
        ...dialogPE,
      }),
      component: markRaw(component),
      componentPE: componentPE === undefined ? null : reactive(componentPE),
      componentRef,
      dialogRef,
    })
    return { componentRef, dialogRef }
  }

  function update(value: boolean, id: string): void {
    collection.get(id)!.dialogPE.modelValue = value
    if (!value) {
      collection.get(id)!.componentRef = null
      collection.get(id)!.dialogRef = null
      setTimeout(() => {
        collection.delete(id)
      }, 2000) // 等待动画结束
    }
  }

  function setComponentRef(id: string, vnode: VNode): void {
    collection.get(id)!.componentRef = vnode.component?.exposed ?? null
  }

  function setDialogRef(id: string, vnode: VNode): void {
    collection.get(id)!.dialogRef = vnode.component?.exposed ?? null
  }

  return {
    collection,
    add,
    update,
    setComponentRef,
    setDialogRef,
  }
})
