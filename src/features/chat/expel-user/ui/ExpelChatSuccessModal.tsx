import { useSidebarActions } from '@/entities/chat/model/sidebar.store'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useModalActions } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'

export const ExpelChatSuccessModal = () => {
  const { closeModal } = useModalActions()
  const { closeSidebar } = useSidebarActions()

  const handleClickModalButton = () => {
    closeModal()
    closeSidebar()
  }

  return (
    <ModalWithOneButton
      modalKey={MODAL_KEYS.EXPEL_USER}
      button={{ onClickButton: handleClickModalButton }}
    />
  )
}
