import { ModalWithOneButton, type ModalWithOneButtonProps } from '@/shared/ui/modal/ButtonModal'

export const ExpelChatErrorModal = ({
  label,
  isModalOpen,
  closeModal,
}: Omit<ModalWithOneButtonProps, 'button'>) => {
  return (
    <ModalWithOneButton
      label={label}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      button={{ onClickButton: closeModal }}
    />
  )
}
