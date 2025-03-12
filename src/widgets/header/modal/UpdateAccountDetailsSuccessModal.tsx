import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton, type ModalWithOneButtonProps } from '@/shared/ui/modal/ButtonModal'

export const UpdateAccountDetailsSuccessModal = ({
  label,
  isModalOpen,
  closeModal,
}: Omit<ModalWithOneButtonProps, 'button'>) => {
  const navigate = useNavigate()

  const handleClickModal = () => {
    navigate('/mypage', { replace: true })
    closeModal()
  }

  return (
    <ModalWithOneButton
      label={label}
      isModalOpen={isModalOpen}
      closeModal={handleClickModal}
      button={{ onClickButton: handleClickModal }}
    />
  )
}
