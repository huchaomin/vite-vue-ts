/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-24 10:01:05
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-08 11:12:57
 * @Description  :
 */

const passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/

// clearable 时，value 为 null
function required(value: string | null | [], msg?: string): string | true {
  if (value === '' || value === null || value.length === 0) {
    return msg ?? '必填!'
  }
  return true
}

export default {
  required: [required],
  captcha: [
    (value: string | null) => required(value, '请输入验证码!'),
    (value: string | null) => {
      if (value?.length === 4) return true
      return '验证码必须为4位!'
    },
  ],
  password: [
    required,
    (value: string | null) => {
      if (passwordReg.test(value as string)) return true
      return '密码必须包含数字和字母并且不少于6位!'
    },
  ],
}
