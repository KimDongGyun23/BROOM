import { useFormContext } from 'react-hook-form'

import { useUpdatePassword } from '@/entities/mypage/api/useMypage.mutation'
import type { PasswordUpdateForm } from '@/entities/mypage/model/mypage.type'
import { useModalActions } from '@/shared/model/modal.store'

export const useEditPassword = () => {
  const { handleSubmit } = useFormContext<PasswordUpdateForm>()

  const { openOneButtonModal } = useModalActions()
  const { mutate: updatePassword } = useUpdatePassword()

  const handleEditPassword = (formData: PasswordUpdateForm) => {
    const { confirm: _confirm, ...rest } = formData
    updatePassword(
      { body: { ...rest } },
      {
        onSuccess: (response) => openOneButtonModal(response, true),
        onError: (error) => openOneButtonModal(error.message, false),
      },
    )
  }

  return { onSubmit: handleSubmit(handleEditPassword) }
}
