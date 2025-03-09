import type { ModalWithOneButtonProps } from '@/shared/ui/modal/ButtonModal'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const DeletePostErrorModal = ({
  label,
  isModalOpen,
  closeModal,
}: Omit<ModalWithOneButtonProps, 'button'>) => (
  <ModalWithOneButton
    label={label}
    isModalOpen={isModalOpen}
    closeModal={closeModal}
    button={{ onClickButton: closeModal }}
  />
)
