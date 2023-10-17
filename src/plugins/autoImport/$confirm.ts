/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-04 09:24:17
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-17 13:58:44
 * @Description  :
 */
import ConfirmContent from './modules/ConfirmContent.vue'

export default function (
  content: string | Ref<string>,
  title: string | Ref<string> = '提示', // ts默认值和可选参数不能一起使用
  userReject: boolean = false, // 如果用户点击取消，是否reject
): Promise<void> {
  const dialogStore = useDialogStore()
  return new Promise((resolve, reject) => {
    dialogStore.add(
      {
        title,
        width: 400,
        onConfirm: () => {
          resolve()
        },
        onCancel: () => {
          if (userReject) {
            reject()
          }
        },
      },
      ConfirmContent,
      {
        content,
      },
    )
  })
}
