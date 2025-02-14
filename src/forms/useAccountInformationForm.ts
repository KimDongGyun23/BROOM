import { z } from 'zod'

import { useCustomForm } from '@/hooks/useCustomForm'
import { useFetchAccountInformation } from '@/query/useMypageQuery'
import type { AccountInformation } from '@/types/mypage'

const currentYear = new Date().getFullYear()

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

const accountInformationSchema = z
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

export const useAccountInformationForm = () => {
  const { data: defaultValues } = useFetchAccountInformation()
  const formMethod = useCustomForm<AccountInformation>(accountInformationSchema, { defaultValues })

  return formMethod
}
