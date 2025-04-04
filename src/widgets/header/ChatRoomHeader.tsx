import { useOpenChatSidebarWithInformation } from '@/features/chat-sidebar/hook/useOpenChatSidebarWithInformation'
import { ChatSidebar } from '@/features/chat-sidebar/ui/ChatSidebar'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

type Props = {
  handleMoveToPrevPage: VoidFunction
}

export const ChatRoomHeader = ({ handleMoveToPrevPage }: Props) => {
  const handleOpenSidebar = useOpenChatSidebarWithInformation()

  return (
    <>
      <SubHeaderWithIcon
        type={'kebab'}
        onClickCancel={handleMoveToPrevPage}
        onClickKebab={handleOpenSidebar}
      />
      <ChatSidebar />
    </>
  )
}
