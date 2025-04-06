import { useOpenChatSidebar } from '@/features/chat-sidebar/model/useOpenChatSidebar'
import { ChatSidebar } from '@/features/chat-sidebar/ui/ChatSidebar'
import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

type Props = {
  handleMoveToPrevPage: VoidFunction
}

export const ChatRoomHeader = ({ handleMoveToPrevPage }: Props) => {
  const { handleOpenSidebar } = useOpenChatSidebar()

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
