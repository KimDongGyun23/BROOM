import { useOpenChatSidebarWithInformation } from '@/features/chat-sidebar/hook/useOpenChatSidebarWithInformation'
import { ChatSidebar } from '@/features/chat-sidebar/ui/ChatSidebar'
import { ModalStoreProvider } from '@/shared/model/modal.store'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

const ChatRoomHeaderWithModal = () => {
  const handleOpenSidebar = useOpenChatSidebarWithInformation()

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={handleOpenSidebar} />
      <ChatSidebar />
      <ModalWithOneButton />
    </>
  )
}

export const ChatRoomHeader = () => (
  <ModalStoreProvider>
    <ChatRoomHeaderWithModal />
  </ModalStoreProvider>
)
