import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton } from '@/components/view/Modal'
import { useModalActions, useModalState } from '@/stores/modal'

export const BusReservationCreateModal = () => {
  const navigate = useNavigate()
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  const handleModalClose = useCallback(() => {
    closeModal()
    navigate(-1)
  }, [closeModal, navigate])

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{ onClick: handleModalClose, label: '완료' }}
    />
  )
}
