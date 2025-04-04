import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import { useAuthActions } from '@/features/login/model/auth.store'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useLogoutMutation } from '../api/useLogout.mutation'

export const useLogout = (openModal: OpenModal, closeModal: VoidFunction) => {
  const navigate = useNavigate()

  const { mutate: logoutMutation } = useLogoutMutation()

  const { logout } = useAuthActions()

  const handleOpenModal = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        openModal(MODAL_KEYS.success, '로그아웃에 성공했습니다.')
        instance.resetAccessToken()
        window.history.pushState({ isLogoutModalOpen: true }, '')
      },
    })
  }

  const handleClickModal = () => {
    closeModal()
    navigate('/home')
    logout()

    if (window.history.state?.isLogoutModalOpen) window.history.replaceState({}, '')
  }

  return { handleOpenModal, handleClickModal }
}
