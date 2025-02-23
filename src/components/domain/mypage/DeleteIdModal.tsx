import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { useIsSuccessModal, useModalActions, useModalState } from '@/stores/modal'
import { clearSessionStorage } from '@/utils/storage'

export const DeleteIdModal = () => {
  const navigate = useNavigate()

  const { isModalOpen, label } = useModalState()
  const isSuccessModal = useIsSuccessModal()
  const { closeModal } = useModalActions()

  const handleCloseSuccessModal = () => {
    closeModal()
    clearSessionStorage()
    navigate('/home')
  }

  const handleCloseErrorModal = () => closeModal()

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{
        onClick: isSuccessModal ? handleCloseSuccessModal : handleCloseErrorModal,
        label: '확인',
      }}
    />
  )
}
