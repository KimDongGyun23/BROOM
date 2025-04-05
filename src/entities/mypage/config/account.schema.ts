import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const accountAttribute = {
  NICKNAME: {
    section: 'nickname',
    label: '닉네임',
    input: { placeholder: '최소 2글자, 최대 8글자입니다.' },
  },
  DISCHARGE_YEAR: {
    section: 'dischargeYear',
    label: '전역 연도',
    input: { placeholder: '숫자 4자리를 입력해주세요.', maxLength: 4 },
  },
  MILITARY_BRANCH: { section: 'militaryBranch', label: '복무했던 군종' },
} as const

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
