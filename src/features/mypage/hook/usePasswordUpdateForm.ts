import { useCustomForm } from '@/shared/hook/useCustomForm'
import { useModalActions } from '@/shared/model/modal.store'

import { useUpdatePassword } from '../api/useMypage.mutation'
import { newPasswordSchema } from '../model/mypage.schema'
import type { PasswordUpdateForm } from '../model/mypage.type'

export const usePasswordUpdateForm = () => {
  const formMethod = useCustomForm<PasswordUpdateForm>(newPasswordSchema)
  const { handleSubmit } = formMethod

  const { openOneButtonModal } = useModalActions()
  const { mutate: updatePassword } = useUpdatePassword()

  const handleSubmitForm = (formData: PasswordUpdateForm) => {
    const { confirm: _confirm, ...rest } = formData
    updatePassword(
      { body: { ...rest } },
      {
        onSuccess: (response) => openOneButtonModal(response, true),
        onError: (error) => openOneButtonModal(error.message, false),
      },
    )
  }

  return { formMethod, onSubmit: handleSubmit(handleSubmitForm) }
}
