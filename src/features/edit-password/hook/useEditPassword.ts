import { useFormContext } from 'react-hook-form'

import { useUpdatePassword } from '@/entities/mypage/api/useMypage.mutation'
import type { PasswordUpdateForm } from '@/entities/mypage/model/mypage.type'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

export const useEditPassword = (openModal: OpenModal) => {
  const { handleSubmit } = useFormContext<PasswordUpdateForm>()

  const { mutate: updatePassword } = useUpdatePassword()

  const handleEditPassword = (formData: PasswordUpdateForm) => {
    const { confirm: _confirm, ...rest } = formData
    updatePassword(
      { body: { ...rest } },
      {
        onSuccess: (response) => openModal(MODAL_KEYS.success, response),
        onError: (error) => openModal(MODAL_KEYS.error, error.message),
      },
    )
  }

  return { onSubmit: handleSubmit(handleEditPassword) }
}
