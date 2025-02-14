import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton } from '@/components/view/Modal'
import { useModalActions, useModalState } from '@/stores/modal'

export const NewPasswordModal = () => {
  const navigate = useNavigate()
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  const handleCloseModal = () => {
    closeModal()
    navigate('/mypage', { replace: true })
  }

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{ onClick: handleCloseModal, label: '완료' }}
    />
  )
}
