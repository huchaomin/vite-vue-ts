/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-04 09:24:17
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-09 09:36:18
 * @Description  :
 */
import { type addFnType } from '@/store/modules/dialog'

const createDialog: addFnType = (dialogPE, component, componentPE) => {
  const dialogStore = useDialogStore()
  return dialogStore.add(dialogPE, component, componentPE)
}

export default createDialog
