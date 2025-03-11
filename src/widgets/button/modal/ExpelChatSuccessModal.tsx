import { useSidebarActions } from '@/features/chat-sidebar/model/sidebar.store'
import type { ModalWithOneButtonProps } from '@/shared/ui/modal/ButtonModal'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const ExpelChatSuccessModal = ({
  label,
  isModalOpen,
  closeModal,
}: Omit<ModalWithOneButtonProps, 'button'>) => {
  const { closeSidebar } = useSidebarActions()

  const handleClickModalButton = () => {
    closeModal()
    closeSidebar()
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
