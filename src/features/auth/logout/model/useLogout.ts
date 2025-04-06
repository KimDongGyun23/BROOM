import { instance } from '@/app/api'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions } from '@/shared/model/modal.store'

import { useLogoutMutation } from '../api/useLogout.mutation'

export const useLogout = () => {
  const { openModal } = useModalActions()

  const { mutate: logoutMutation } = useLogoutMutation()

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        openModal(MODAL_KEYS.LOGOUT, '로그아웃에 성공했습니다.')
        instance.resetAccessToken()
        window.history.pushState({ isLogoutModalOpen: true }, '')
      },
    })
  }

  return { handleLogout }
}
