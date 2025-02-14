import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton } from '@/components/view/Modal'
import { useModalActions, useModalState } from '@/stores/modal'

export const AccountInformationEditModal = () => {
  const navigate = useNavigate()
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  const handleClose = () => {
    navigate('/mypage', { replace: true })
    closeModal()
  }

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{ onClick: handleClose, label: '확인' }}
    />
  )
}
