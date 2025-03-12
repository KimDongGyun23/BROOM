import { z } from 'zod'

export const busStatusAttribute = {
  STUDENT_ID: {
    section: 'studentId',
    label: '학번',
    input: { placeholder: '학번을 입력해주세요.', maxLength: 10 },
  },
} as const

export const busApplicationAttribute = {
  NAME: { section: 'name', label: '이름', input: { placeholder: '이름을 입력해주세요.' } },
  STUDENT_ID: {
    section: 'studentId',
    label: '학번',
    input: { placeholder: '학번을 입력해주세요.', maxLength: 10 },
  },
  PHONE_NUMBER: {
    section: 'phoneNumber',
    label: '연락처',
    input: { placeholder: '-를 제외한 숫자만 입력해주세요.', maxLength: 11 },
  },
} as const

export const busStatusSchema = z.object({
  studentId: z.string().length(10, { message: '학번은 10자리 숫자여야 합니다.' }),
})

export const busApplicationSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  studentId: z.string().length(10, { message: '학번은 10자리 숫자여야 합니다.' }),
  phoneNumber: z
    .string()
    .min(9, { message: '전화번호를 확인해주세요.' })
    .max(11, { message: '전화번호를 확인해주세요.' }),
})
