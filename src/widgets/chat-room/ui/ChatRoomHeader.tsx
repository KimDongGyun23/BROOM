import { useOpenChatSidebarWithInformation } from '@/features/chat-sidebar/hook/useOpenChatSidebarWithInformation'
import { ChatSidebar } from '@/features/chat-sidebar/ui/ChatSidebar'
import { ModalWithOneButton } from '@/shared/ui/modal/ButtonModal'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

export const ChatRoomHeader = () => {
  const handleOpenSidebar = useOpenChatSidebarWithInformation()

  return (
    <>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={handleOpenSidebar} />
      <ChatSidebar />
      <ModalWithOneButton />
    </>
  )
}
