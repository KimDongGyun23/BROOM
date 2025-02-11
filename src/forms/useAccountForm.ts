import { z } from 'zod'

import { useCustomForm } from '@/hooks/useCustomForm'
import { useUpdateUserAccount } from '@/services/query/useMypageQuery'
import { useModalActions } from '@/stores/modal'
import type { AccountInfoResponse, UserAccount } from '@/types/mypage'

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
    input: { type: 'number', placeholder: '숫자 4자리를 입력해주세요.' },
  },
  MILITARY_BRANCH: { section: 'militaryBranch', label: '복무했던 군종' },
} as const

const accountSchema = z
  .object({
    nickname: z
      .string()
      .min(2, { message: '닉네임은 2글자 이상입니다.' })
      .max(8, { message: '닉네임은 8글자 이하입니다.' }),
    dischargeYear: z
      .union([z.string(), z.number()])
      .transform((value) => (typeof value === 'string' ? parseInt(value, 10) : value))
      .refine((val) => val >= currentYear - 4 && val <= currentYear, {
        message: `${currentYear - 4}년부터 현재 연도까지만 입력 가능합니다.`,
      }),
    militaryBranch: z.string(),
  })
  .partial()
  .refine((data) => data.militaryBranch !== undefined, {
    path: ['militaryBranch'],
    message: '군종을 선택해주세요.',
  })

type useAccountFormProps = {
  defaultValues: UserAccount | undefined
  isValidated: boolean
}

export const useAccountForm = ({ defaultValues, isValidated }: useAccountFormProps) => {
  const { openModal } = useModalActions()
  const { mutate: updateAccount } = useUpdateUserAccount()

  const formMethod = useCustomForm<AccountInfoResponse>(accountSchema, { defaultValues })
  const { handleSubmit, setError, clearErrors } = formMethod

  const handleAccountUpdate = (formData: UserAccount) => {
    const nicknameSection = accountAttribute.NICKNAME.section

    if (isValidated) {
      clearErrors(nicknameSection)
      updateAccount(
        { body: formData },
        {
          onSuccess: () => openModal('계정 정보가 수정되었습니다.'),
          onError: () => openModal('계정 정보 업데이트에 실패했습니다.'),
        },
      )
    } else {
      setError(nicknameSection, { type: 'manual', message: '닉네임 중복 확인을 해주세요.' })
    }
  }

  return { formMethod, onSubmit: handleSubmit(handleAccountUpdate) }
}
