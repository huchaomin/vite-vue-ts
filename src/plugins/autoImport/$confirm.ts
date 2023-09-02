import ConfirmContent from './modules/ConfirmContent.vue'

export default function (
  title: string | Ref<string>,
  content: string | Ref<string>,
): void {
  const dialogStore = useDialogStore()
  dialogStore.add(
    {
      title,
      width: 400,
    },
    ConfirmContent,
    {
      content,
    },
  )
}
