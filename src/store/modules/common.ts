export default defineStore('common', () => {
  const token = ref('');
  const count = ref(0);

  function increment(): void {
    count.value++;
  }

  return {
    token,
    count,
    increment,
  };
});
