import ConfirmContent from './modules/ConfirmContent.vue'

export default function (title: string, content: string): void {
  const dialogStore = useDialogStore()
  dialogStore.add(
    ConfirmContent,
    {
      content,
    },
    {
      title,
    },
  )
}
