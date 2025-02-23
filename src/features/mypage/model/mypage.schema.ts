import { z } from 'zod'

export const accountInformationAttribute = {
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

export const newPasswordAttribute = {
  PREV_PASSWORD: {
    section: 'password',
    label: '기존 비밀번호',
    input: { placeholder: '기존 비밀번호를 입력해주세요.' },
  },
  NEW_PASSWORD: {
    section: 'newPassword',
    label: '새로운 비밀번호',
    input: { placeholder: '최소 8글자, 최대 16글자입니다.' },
  },
  CONFIRM: {
    section: 'confirm',
    label: '비밀번호 확인',
    input: { placeholder: '비밀번호를 다시 입력해주세요.' },
  },
} as const

const currentYear = new Date().getFullYear()

export const accountInformationSchema = z
  .object({
    nickname: z
      .string()
      .min(2, { message: '닉네임은 2글자 이상입니다.' })
      .max(8, { message: '닉네임은 8글자 이하입니다.' }),
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
