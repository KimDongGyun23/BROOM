import { useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import { useAuthActions } from '@/features/login/model/auth.store'
import type { OpenModal } from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useDeleteIdMutation } from '../api/useDeleteId.mutation'

export const useDeleteId = (openModal: OpenModal, closeModal: VoidFunction) => {
  const navigate = useNavigate()

  const { mutate: deleteId } = useDeleteIdMutation()

  const { logout } = useAuthActions()

  const handleOpenModal = () => {
    deleteId(undefined, {
      onSuccess: () => {
        openModal(MODAL_KEYS.success, '회원탈퇴에 성공했습니다.')
        instance.resetAccessToken()
        window.history.pushState({ isDeleteIdModalOpen: true }, '')
      },
    })
  }

  const handleClickModal = () => {
    closeModal()
    navigate('/home')
    logout()

    if (window.history.state?.isDeleteIdModalOpen) window.history.replaceState({}, '')
  }

  return { handleOpenModal, handleClickModal }
}
