export default defineStore('common', () => {
  const count = ref(0);

  function increment(): void {
    count.value++;
  }

  return {
    count,
    increment,
  };
});
