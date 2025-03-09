import type { ModalWithOneButtonProps } from '@/shared/ui/modal/ButtonModal'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const ToggleBusApplicationErrorModal = ({
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
