import { z } from 'zod'

export const signupAttribute = {
  ID: {
    section: 'userId',
    label: '아이디',
    input: { placeholder: '최소 6글자, 최대 12글자입니다.' },
  },
  PASSWORD: {
    section: 'password',
    label: '비밀번호',
    input: { placeholder: '최소 8글자, 최대 16글자입니다.' },
  },
  CONFIRM: {
    section: 'confirm',
    label: '비밀번호 확인',
    input: { placeholder: '비밀번호를 다시 입력해주세요.' },
  },

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

const currentYear = new Date().getFullYear()

export const signupSchema = z
  .object({
    userId: z
      .string()
      .min(6, { message: '아이디는 6글자 이상입니다.' })
      .max(12, { message: '아이디는 12글자 이하입니다.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8글자 이상입니다.' })
      .max(16, { message: '비밀번호는 16글자 이하입니다.' }),
    confirm: z.string(),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 2글자 이상입니다.' })
      .max(8, { message: '닉네임은 8글자 이하입니다.' }),
    dischargeYear: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((val) => val >= currentYear - 4 && val <= currentYear, {
        message: `${currentYear - 4}년부터 현재 연도까지만 입력 가능합니다.`,
      }),
    militaryBranch: z.string(),
  })
  .partial()
  .refine((data) => data.password === data.confirm, {
    path: ['confirm'],
    message: '비밀번호가 일치하지 않습니다.',
  })
  .refine((data) => data.militaryBranch !== undefined, {
    path: ['militaryBranch'],
    message: '군종을 선택해주세요.',
  })
