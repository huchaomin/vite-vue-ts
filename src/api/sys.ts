import { type apiConfig } from '@/plugins/autoImport/$api'

const prefix = '/sys'

export const randomImage: apiConfig = {
  url: `${prefix}/randomImage/{timestamp}`,
  loading: false,
  immediate: false,
  isWhiteApi: true,
}

export const login: apiConfig = {
  url: `${prefix}/login`,
  method: 'post',
  isWhiteApi: true,
}

export const logout: apiConfig = {
  url: `${prefix}/logout`,
  method: 'post',
}

export const user: apiConfig = {
  url: `${prefix}/permission/getUserPermissionByToken`,
}

export const dict: apiConfig = {
  url: `${prefix}/dict/getDictItems/{code}`,
  loading: false,
}

export const updatePassword: apiConfig = {
  url: `${prefix}/user/updatePassword`,
  method: 'put',
}
