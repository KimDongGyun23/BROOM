import type { To } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton, type ModalWithOneButtonProps } from '@/shared/ui/modal/ButtonModal'

export const EditPostSuccessModal = ({
  label,
  isModalOpen,
  closeModal,
}: Omit<ModalWithOneButtonProps, 'button'>) => {
  const navigate = useNavigate()

  const handleClickModalButton = () => {
    navigate(-1 as To, { replace: true })
    closeModal()
  }

  return (
    <ModalWithOneButton
      label={label}
      isModalOpen={isModalOpen}
      closeModal={handleClickModalButton}
      button={{ onClickButton: handleClickModalButton }}
    />
  )
}
