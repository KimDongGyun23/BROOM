import { useNavigate } from 'react-router-dom'

import { clearSessionStorage } from '@/shared/lib/storage'
import { useIsSuccessModal, useModalActions, useModalState } from '@/shared/model/modal'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

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
