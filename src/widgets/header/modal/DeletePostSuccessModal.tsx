import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton, type ModalWithOneButtonProps } from '@/shared/ui/modal/ButtonModal'

export const DeletePostSuccessModal = ({
  label,
  isModalOpen,
  closeModal,
}: Omit<ModalWithOneButtonProps, 'button'>) => {
  const navigate = useNavigate()

  const handleClickModalButton = () => {
    navigate(`/board`, { replace: true })
  }

  return (
    <ModalWithOneButton
      label={label}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      button={{ onClickButton: handleClickModalButton }}
    />
  )
}
