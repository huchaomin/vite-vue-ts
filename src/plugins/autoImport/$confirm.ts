import ConfirmContent from './modules/ConfirmContent.vue'

export default function (
  title: string | Ref<string>,
  content: string | Ref<string>,
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
