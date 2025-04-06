import { z } from 'zod'

export const loginAttribute = {
  ID: {
    section: 'userId',
    label: '아이디',
    input: { placeholder: '아이디를 입력해주세요.' },
  },
  PASSWORD: {
    section: 'password',
    label: '비밀번호',
    input: { placeholder: '비밀번호를 입력해주세요.' },
  },
}

export const loginSchema = z.object({
  userId: z.string().min(1, { message: '아이디를 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
})
