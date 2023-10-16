/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-04 09:24:17
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-13 14:44:54
 * @Description  :
 */
import type CDialog from '@/components/global/CDialog.vue'

interface BasePropsEmitsType<T extends new () => ComponentPublicInstance> {
  dialogProps: AllowRefValue<InstanceType<typeof CDialog>['$props']>
  dialogEmits: Partial<InstanceType<typeof CDialog>['$emit']>
  componentProps: AllowRefValue<InstanceType<T>['$props']>
  componentEmits: Partial<InstanceType<T>['$emit']>
}

export type addFnType = <T extends new () => ComponentPublicInstance>(
  dialogPE: Omit<BasePropsEmitsType<T>['dialogProps'], 'modelValue'> &
    BasePropsEmitsType<T>['dialogEmits'],
  component: T,
  componentPE?: BasePropsEmitsType<T>['componentProps'] & BasePropsEmitsType<T>['componentEmits'],
) => {
  componentRef: Ref<InstanceType<T> | null>
  dialogRef: Ref<InstanceType<typeof CDialog> | null>
}

export default defineStore('dialog', () => {
  const collection = reactive(new Map())

  const add: addFnType = (dialogPE, component, componentPE) => {
    const dialogId = _.uniqueId('dialog_')
    const componentRef = ref(null)
    const dialogRef = ref(null)
    collection.set(dialogId, {
      dialogPE: {
        modelValue: true,
        ...dialogPE,
      },
      component: markRaw(component),
      componentPE: componentPE ?? null,
      componentRef,
      dialogRef,
    })
    return { componentRef, dialogRef }
  }

  function setComponentRef(id: string, refValue: Element | ComponentPublicInstance | null): void {
    if (refValue === null) return
    collection.get(id)!.componentRef = refValue
  }

  function setDialogRef(id: string, refValue: Element | ComponentPublicInstance | null): void {
    if (refValue === null) return
    collection.get(id)!.dialogRef = refValue
  }

  function update(value: boolean, id: string): void {
    collection.get(id)!.dialogPE.modelValue = value
    if (!value) {
      setTimeout(() => {
        setComponentRef(id, null)
        setDialogRef(id, null)
        collection.delete(id)
      }, 2000)
    }
  }

  return {
    collection,
    add,
    update,
    setComponentRef,
    setDialogRef,
  }
})
