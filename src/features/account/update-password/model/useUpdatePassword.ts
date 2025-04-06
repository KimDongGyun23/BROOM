import type { NewPasswordForm } from '@/entities/mypage/model/mypage.type'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions } from '@/shared/model/modal.store'

import { useUpdatePasswordMutation } from '../api/useUpdatePassword.mutation'

export const useUpdatePassword = () => {
  const { openModal } = useModalActions()

  const { mutate: updatePassword } = useUpdatePasswordMutation()

  const handleUpdatePassword = (formData: NewPasswordForm) => {
    const { confirm: _confirm, ...rest } = formData

    updatePassword(
      { body: { ...rest } },
      { onSuccess: (response) => openModal(MODAL_KEYS.UPDATE_PASSWORD, response) },
    )
  }

  return { handleUpdatePassword }
}
