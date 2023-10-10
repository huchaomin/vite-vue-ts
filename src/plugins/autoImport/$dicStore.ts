/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-24 11:56:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-10 16:02:53
 * @Description  :
 */
import { dict } from '@/api/sys'

interface DictionaryItem {
  label: string
  value: string
}

const codeTypesMap = new Map()

function get(code: string): PromiseLike<DictionaryItem[]> {
  if (codeTypesMap.has(code)) {
    return codeTypesMap.get(code)
  }
  const promise = $api(dict, {
    code,
  }).then((res) => {
    const result = res.data.value
    if (result === null || result.length === 0) {
      codeTypesMap.delete(code)
      return Promise.resolve([])
    }
    return Promise.resolve(
      result.map((item: any) => {
        return {
          label: item.title,
          value: item.value,
        }
      }),
    )
  })
  codeTypesMap.set(code, promise)
  return promise
}

function getDic(code: string, filterArr: string[] = []): Ref<DictionaryItem[]> {
  const arr: Ref<DictionaryItem[]> = ref([])
  get(code).then((res) => {
    if (filterArr.length > 0) {
      arr.value = res.filter((item) => filterArr.includes(item.value))
    } else {
      arr.value = res
    }
  })
  return arr
}

export default getDic
