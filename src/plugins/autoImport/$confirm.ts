import ConfirmContent from './modules/ConfirmContent.vue'

export default function (
  content: string | Ref<string>,
  title: string | Ref<string> = '提示', // ts默认值和可选参数不能一起使用
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
          reject()
        },
      },
      ConfirmContent,
      {
        content,
      },
    )
  })
}
