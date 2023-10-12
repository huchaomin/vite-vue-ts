/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-24 10:01:05
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-12 09:28:54
 * @Description  :
 */

type ValidationResult = string | boolean
export type ValidationRule =
  | ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)

export type CustomerValidationRule = (...rest: any[]) => (value: any) => ValidationResult

const passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/

// clearable 时，value 为 null
function required(value: string | null | [], msg?: string): string | true {
  if (value === '' || value === null || value.length === 0) {
    return msg ?? '必填!'
  }
  return true
}

const rules: Record<string, ValidationRule[] | CustomerValidationRule> = {
  required: [required],
  captcha: [
    (value: string | null) => required(value, '请输入验证码!'),
    (value: string | null) => {
      if (value?.length === 4) return true
      return '验证码必须为4位!'
    },
  ],
  password: [
    required, // TODO
    (value: string | null) => {
      if (passwordReg.test(value as string)) return true
      return '密码必须包含数字和字母并且不少于6位!'
    },
  ],
  minLength: (limit: string) => {
    return (value: string | null) => {
      if (value === null || value === '') {
        return true
      }
      if (value.length < Number(limit)) {
        return `最少${limit}个字符`
      }
      return true
    }
  },
  maxLength: (limit: string) => {
    return (value: string | null) => {
      if (value === null || value === '') {
        return true
      }
      if (value.length > Number(limit)) {
        return `最多${limit}个字符`
      }
      return true
    }
  },
}
export default rules
