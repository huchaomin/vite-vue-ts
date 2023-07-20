export default defineStore('common', () => {
  const count = ref(0);
  // 全局加载状态
  const loadingCount = ref(0);
  const loading = ref(false);
  watch(loadingCount, (val) => {
    loading.value = val > 0;
  });

  function increment(): void {
    count.value++;
  }

  return {
    loading,
    loadingCount,
    count,
    increment,
  };
});
