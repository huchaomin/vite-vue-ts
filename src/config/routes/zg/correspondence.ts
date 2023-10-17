/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-07 10:59:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-17 16:23:24
 * @Description  :
 */
export default {
  'system/UserList': () => import('@/views/systemManagement/userManagement/Index.vue'),
  'system/RoleUserList': () => import('@/views/systemManagement/roleManagement/Index.vue'),
  'system/DictList': () => import('@/views/systemManagement/dictManagement/Index.vue'),
}
