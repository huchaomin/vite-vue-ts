export default defineStore(
  'common',
  () => {
    // 全局加载状态
    const loadingCount = ref(0)
    const loading = ref(false)
    watch(loadingCount, (val) => {
      loading.value = val > 0
    })

    const drawerOpen = ref(true)
    return {
      loading,
      loadingCount,
      drawerOpen,
    }
  },
  {
    persist: {
      paths: ['drawerOpen'],
    },
  },
)
