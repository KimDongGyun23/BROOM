import { instance } from '@/app/api'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions } from '@/shared/model/modal.store'

import { useDeleteAccountMutation } from '../api/useDeleteAccount.mutation'

export const useDeleteAccount = () => {
  const { openModal } = useModalActions()

  const { mutate: deleteAccount } = useDeleteAccountMutation()

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        openModal(MODAL_KEYS.DELETE_ACCOUNT, '회원탈퇴에 성공했습니다.')
        instance.resetAccessToken()
        window.history.pushState({ isDeleteIdModalOpen: true }, '')
      },
    })
  }

  return { handleDeleteAccount }
}
