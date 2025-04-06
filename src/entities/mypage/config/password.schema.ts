import { z } from 'zod'

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: '비밀번호를 다시 확인해주세요.' })
      .max(16, { message: '비밀번호를 다시 확인해주세요.' }),
    newPassword: z
      .string()
      .min(8, { message: '비밀번호는 8글자 이상입니다.' })
      .max(16, { message: '비밀번호는 16글자 이하입니다.' }),
    confirm: z
      .string()
      .min(8, { message: '비밀번호를 다시 확인해주세요.' })
      .max(16, { message: '비밀번호를 다시 확인해주세요..' }),
  })
  .partial()
  .refine((data) => data.newPassword === data.confirm, {
    path: ['confirm'],
    message: '비밀번호가 일치하지 않습니다.',
  })
