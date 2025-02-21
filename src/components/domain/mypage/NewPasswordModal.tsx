import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton } from '@/components/view/modal/ButtonModal'
import { useIsSuccessModal, useModalActions, useModalState } from '@/stores/modal'

export const NewPasswordModal = () => {
  const navigate = useNavigate()

  const { isModalOpen, label } = useModalState()
  const isSuccessModal = useIsSuccessModal()
  const { closeModal } = useModalActions()

  const handleCloseSuccessModal = () => {
    closeModal()
    navigate('/mypage', { replace: true })
  }

  const handleCloseErrorModal = () => closeModal()

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{
        onClick: isSuccessModal ? handleCloseSuccessModal : handleCloseErrorModal,
        label: '완료',
      }}
    />
  )
}
