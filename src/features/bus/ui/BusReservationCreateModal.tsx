import { useCallback } from 'react'
import type { To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useModalActions, useModalState } from '@/shared/model/modal.type'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const BusReservationCreateModal = () => {
  const navigate = useNavigate()
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  const handleModalClose = useCallback(() => {
    closeModal()
    navigate(-1 as To, { replace: true })
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
