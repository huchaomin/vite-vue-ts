const prefix = '/sys';

export const randomImage = {
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

export const user = {
  url: `${prefix}/permission/getUserPermissionByToken`,
  isWhiteApi: true,
};

export const dict = {
  url: `${prefix}/dict/getDictItems/{code}`,
  loading: false,
};
