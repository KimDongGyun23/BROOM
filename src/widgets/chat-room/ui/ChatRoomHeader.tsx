import { useOpenChatSidebarWithInformation } from '@/features/chat-sidebar/hook/useOpenChatSidebarWithInformation'
import { ChatSidebar } from '@/features/chat-sidebar/ui/ChatSidebar'
import useModal from '@/shared/hook/useModal'
import { MODAL_KEYS } from '@/shared/lib/constants'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

export const ChatRoomHeader = () => {
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()
  const handleOpenSidebar = useOpenChatSidebarWithInformation(openModal)

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={handleOpenSidebar} />
      <ChatSidebar />
      <ModalWithOneButton
        label={modalLabel(MODAL_KEYS.error)}
        isModalOpen={isModalOpen(MODAL_KEYS.error)}
        closeModal={closeModal}
        button={{ onClickButton: closeModal }}
      />
    </>
  )
}
