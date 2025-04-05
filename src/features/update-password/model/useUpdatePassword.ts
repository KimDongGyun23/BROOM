import type { NewPasswordForm } from '@/entities/mypage/model/mypage.type'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useUpdatePasswordMutation } from '../api/useUpdatePassword.mutation'

export const useUpdatePassword = (openModal: OpenModal) => {
  const { mutate: updatePassword } = useUpdatePasswordMutation()

  const handleUpdatePassword = (formData: NewPasswordForm) => {
    const { confirm: _confirm, ...rest } = formData

    updatePassword(
      { body: { ...rest } },
      { onSuccess: (response) => openModal(MODAL_KEYS.success, response) },
    )
  }

  return { handleUpdatePassword }
}
