import { useNavigate } from 'react-router-dom'

import { useAuthActions } from '@/entities/auth/model/auth.store'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const DeleteAccountSuccessModal = () => {
  const navigate = useNavigate()

  const { logout } = useAuthActions()
  const { closeModal } = useModalActions()

  const handleClickModal = () => {
    closeModal()
    navigate('/home')
    logout()

    if (window.history.state?.isDeleteIdModalOpen) window.history.replaceState({}, '')
  }

  return (
    <ModalWithOneButton
      modalKey={MODAL_KEYS.DELETE_ACCOUNT}
      button={{ onClickButton: handleClickModal }}
    />
  )
}
