import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const accountSchema = z
  .object({
    nickname: z
      .string()
      .min(2, { message: '닉네임은 최소 2글자 이상이어야 합니다.' })
      .max(8, { message: '닉네임은 최대 8글자까지만 가능합니다.' }),
    dischargeYear: z
      .string()
      .refine((val) => Number(val) >= currentYear - 4 && Number(val) <= currentYear, {
        message: `${currentYear - 4}년부터 현재 연도까지만 입력 가능합니다.`,
      }),
    militaryBranch: z.string(),
  })
  .partial()
  .refine((data) => data.militaryBranch !== undefined, {
    path: ['militaryBranch'],
    message: '군종을 선택해주세요.',
  })
