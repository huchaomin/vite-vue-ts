const prefix = '/sys';

export const getRandomImage = {
  url: `${prefix}/randomImage/{timestamp}`,
  loading: false,
  immediate: false,
};

export const login = {
  url: `${prefix}/login`,
  method: 'post',
};
