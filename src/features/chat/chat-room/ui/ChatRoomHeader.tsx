import { SubHeaderWithIcon } from '@/shared/ui/SubHeader'

import { useOpenChatSidebar } from '../../chat-sidebar/model/useOpenChatSidebar'
import { ChatSidebar } from '../../chat-sidebar/ui/ChatSidebar'

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
