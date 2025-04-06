import { useNavigate } from 'react-router-dom'

import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

type Props = {
  label: string
  isModalOpen: boolean
  closeModal: VoidFunction
}

export const DeletePostSuccessModal = ({ label, isModalOpen, closeModal }: Props) => {
  const navigate = useNavigate()

  const handleClickButton = () => navigate('/board', { replace: true })

  return (
    <ModalWithOneButton
      label={label}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      button={{ onClickButton: handleClickButton, buttonLabel: '확인' }}
    />
  )
}
