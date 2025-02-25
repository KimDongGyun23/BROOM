import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useModalActions } from '@/shared/model/modal.type'

import { useUpdatePassword } from '../api/useMypage.mutation'
import { newPasswordSchema } from '../model/mypage.schema'
import type { PasswordUpdateForm } from '../model/mypage.type'

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
