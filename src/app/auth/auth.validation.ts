import type { FormRules } from "naive-ui";

export const formRules: FormRules = {
  username: [
    {
      message: 'Username wajib diisi',
      required: true,
      trigger: ['focus', 'input']
    }
  ],
  password: [
    {
      message: 'Password wajib diisi',
      required: true,
      trigger: ['focus', 'input']
    }
  ]
}
