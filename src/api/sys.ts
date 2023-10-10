/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-17 14:05:48
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-10 15:39:52
 * @Description  :
 */
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
  msgOnSuccess: true,
}

export const logout: apiConfig = {
  url: `${prefix}/logout`,
  method: 'post',
  msgOnSuccess: true,
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
  msgOnSuccess: true,
}

export const userList: apiConfig = {
  url: `${prefix}/user/list`,
}
