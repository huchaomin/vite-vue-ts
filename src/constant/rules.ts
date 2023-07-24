export default {
  username: [
    (value: string | null) => {
      if (value === '' || value === null) {
        return '请输入用户名!';
      }
      return true;
    },
    (value: string | null) => {
      if (value !== null && value.length > 4) return true;
      return '用户名过短';
    },
  ],
  password: [
    (value: string | null) => {
      if (value === '' || value === null) {
        return '请输入密码!';
      }
      return true;
    },
    (value: string | null) => {
      if (value !== null && value.length > 5) return true;
      return '密码过短';
    },
  ],
  captcha: [
    (value: string | null) => {
      if (value === '' || value === null) {
        return '请输入验证码!';
      }
      return true;
    },
    (value: string | null) => {
      if (value?.length === 4) return true;
      return '验证码必须为4位!';
    },
  ],
};
