export default {
  show() {
    const commonStore = useCommonStore()
    commonStore.loadingCount += 1
  },
  hide() {
    const commonStore = useCommonStore()
    commonStore.loadingCount -= 1
  },
}
