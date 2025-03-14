import { useNavigate } from 'react-router-dom'

import type { ModalWithOneButtonProps } from '@/shared/ui/modal/ButtonModal'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const UpdatePasswordSuccessModal = ({
  label,
  isModalOpen,
  closeModal,
}: Omit<ModalWithOneButtonProps, 'button'>) => {
  const navigate = useNavigate()

  const handleClickModalButton = () => {
    navigate('/mypage', { replace: true })
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
