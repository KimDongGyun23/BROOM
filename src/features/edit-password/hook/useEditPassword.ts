import type { PasswordUpdateForm } from '@/entities/mypage/model/mypage.type'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useEditPasswordMutation } from '../api/useEditPassword.mutation'

export const useEditPassword = (openModal: OpenModal) => {
  const { mutate: editPassword } = useEditPasswordMutation()

  const handleEditPassword = (formData: PasswordUpdateForm) => {
    const { confirm: _confirm, ...rest } = formData

    editPassword(
      { body: { ...rest } },
      { onSuccess: (response) => openModal(MODAL_KEYS.success, response) },
    )
  }

  return { handleEditPassword }
}
