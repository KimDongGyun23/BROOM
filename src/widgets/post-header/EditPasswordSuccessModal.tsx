import { useNavigate } from 'react-router-dom'

import type { ModalWithOneButtonProps } from '@/shared/ui/modal/ButtonModal'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const EditPasswordSuccessModal = ({
  label,
  isModalOpen,
  closeModal,
}: Omit<ModalWithOneButtonProps, 'button'>) => {
  const navigate = useNavigate()

  const handleClickModalButton = () => {
    navigate('/mypage', { replace: true })
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
