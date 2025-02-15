import { z } from 'zod'

import { useCustomForm } from '@/hooks/useCustomForm'
import { useUpdatePassword } from '@/query/useMypageQuery'
import { useModalActions } from '@/stores/modal'
import type { PasswordUpdateForm } from '@/types/mypage'

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

export const usePasswordUpdateForm = () => {
  const formMethod = useCustomForm<PasswordUpdateForm>(newPasswordSchema)
  const { handleSubmit } = formMethod

  const { openModal } = useModalActions()
  const { mutate: updatePassword } = useUpdatePassword()

  const handleSubmitForm = (formData: PasswordUpdateForm) => {
    const { confirm: _confirm, ...rest } = formData
    updatePassword(
      { body: { ...rest } },
      {
        onSuccess: (response) => openModal(response, true),
        onError: (error) => openModal(error.message, false),
      },
    )
  }

  return { formMethod, onSubmit: handleSubmit(handleSubmitForm) }
}
