const prefix = '/sys';

export const getRandomImage = {
  url: `${prefix}/randomImage/{timestamp}`,
  loading: false,
  immediate: false,
  isWhiteApi: true,
};

export const login = {
  url: `${prefix}/login`,
  method: 'post',
  isWhiteApi: true,
};
