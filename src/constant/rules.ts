function required(value: string | null | [], msg?: string): string | true {
  if (value === '' || value === null || value.length === 0) {
    return msg ?? '必填!'
  }
  return true
}

export default {
  username: [
    (value: string | null) => required(value, '请输入用户名!'),
    (value: string | null) => {
      if (value !== null && value.length > 4) return true
      return '用户名过短'
    },
  ],
  password: [
    (value: string | null) => required(value, '请输入密码!'),
    (value: string | null) => {
      if (value !== null && value.length > 5) return true
      return '密码过短'
    },
  ],
  captcha: [
    (value: string | null) => required(value, '请输入验证码!'),
    (value: string | null) => {
      if (value?.length === 4) return true
      return '验证码必须为4位!'
    },
  ],
}
