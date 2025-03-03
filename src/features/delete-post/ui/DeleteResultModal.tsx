import { useNavigate } from 'react-router-dom'

import { useIsSuccessModal, useModalActions } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const DeleteResultModal = () => {
  const navigate = useNavigate()

  const isSuccessModal = useIsSuccessModal()

  const { closeModal } = useModalActions()

  const handleDeleteSuccessModal = () => {
    navigate(`/carpool`, { replace: true })
  }

  return (
    <ModalWithOneButton onClickButton={isSuccessModal ? handleDeleteSuccessModal : closeModal} />
  )
}
