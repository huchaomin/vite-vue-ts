export default defineStore('common', () => {
  const token = ref('');
  return {
    token,
  };
}, {
  persist: {
    paths: ['token'],
  },
});
