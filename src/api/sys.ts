/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-17 14:05:48
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-18 18:01:04
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

export const roleList: apiConfig = {
  url: `${prefix}/role/list`,
}

export const duplicateCheck: apiConfig = {
  loading: false,
  msgOnError: false,
  url: `${prefix}/duplicate/check`,
}

export const roleAdd: apiConfig = {
  url: `${prefix}/role/add`,
  method: 'post',
  msgOnSuccess: true,
}

export const roleUpdate: apiConfig = {
  url: `${prefix}/role/edit`,
  method: 'put',
  msgOnSuccess: true,
}

export const roleDelete: apiConfig = {
  url: `${prefix}/role/delete`,
  method: 'delete',
  msgOnSuccess: true,
}

export const dictList: apiConfig = {
  url: `${prefix}/dict/list`,
}

export const dictDelete: apiConfig = {
  url: `${prefix}/dict/delete`,
  method: 'delete',
  msgOnSuccess: true,
}

export const dictAdd: apiConfig = {
  url: `${prefix}/dict/add`,
  method: 'post',
  msgOnSuccess: true,
}

export const dictUpdate: apiConfig = {
  url: `${prefix}/dict/edit`,
  method: 'put',
  msgOnSuccess: true,
}

export const dictItemList: apiConfig = {
  url: `${prefix}/dictItem/list`,
}

export const dictItemDelete: apiConfig = {
  url: `${prefix}/dictItem/delete`,
  method: 'delete',
  msgOnSuccess: true,
}
