import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton } from '@/components/view/Modal'
import { useModalActions, useModalState } from '@/stores/modal'
import { clearSessionStorage } from '@/utils/storage'

export const DeleteIdModal = () => {
  const navigate = useNavigate()
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  const handleCloseModal = () => {
    closeModal()
    clearSessionStorage()
    navigate('/home')
  }

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{ onClick: handleCloseModal, label: '확인' }}
    />
  )
}
