import { type addType } from '@/store/modules/dialog'

const createDialog: addType<new () => ComponentPublicInstance> = (
  dialogPE,
  component,
  componentPE,
) => {
  const dialogStore = useDialogStore()
  return dialogStore.add(dialogPE, component, componentPE)
}

export default createDialog
