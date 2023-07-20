const prefix = '/sys';

export const getRandomImage = {
  url: `${prefix}/randomImage/{timestamp}`,
  loading: false,
  immediate: false,
};
