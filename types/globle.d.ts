/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-17 08:55:35
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-09-27 11:33:22
 * @Description  :
 */
// 为什么加这个 https://juejin.cn/post/7224051399256096829
//  https://juejin.cn/post/6898710177969602574
export {} // 为了让这个声明文件变成模块声明文件，而不是一个全局声明文件
// declare const API_PREFIX: string // 如果是全局声明文件(不需要上面) 就是这么写

// https://www.tslang.cn/docs/handbook/declaration-merging.html 局部声明文件拓展全局变量
declare global {
  const API_PREFIX: string
  const APP_NAME: string
  const PROJECT_NAME: string
  type RequiredPartialKeys<T, K extends keyof T> = {
    [P in K]-?: T[P]
  } & Pick<T, Exclude<keyof T, K>>
  type OptionalPartialKeys<T, K extends keyof T> = {
    [P in K]?: T[P]
  } & Pick<T, Exclude<keyof T, K>>
  type AllowRefValue<T> = {
    [P in keyof T]: MaybeRef<T[P]>
  }
}
