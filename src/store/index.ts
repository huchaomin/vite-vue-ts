import { createPersistedState } from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(
  createPersistedState({
    auto: true, // TODO 该配置将会使所有 Store 持久化存储
  }),
);
export default pinia;
