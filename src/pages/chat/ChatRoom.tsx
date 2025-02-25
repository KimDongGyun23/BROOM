import { Container } from '@/app/style/commonStyles'
import { useFetchChatRoomInformation } from '@/features/chat/api/useChat.query'
import { useChatMessageActions } from '@/features/chat/model/chatMessage.store'
import { SidebarStoreProvider } from '@/features/chat/model/sidebar.store'
import { ChatMessageList } from '@/features/chat/ui/ChatMessageList'
import { ChatRoomHeader } from '@/features/chat/ui/ChatRoomHeader'
import { ChattingRoomProfile } from '@/features/chat/ui/ChattingRoomProfile'
import { MessageInput } from '@/features/chat/ui/MessageInput'
import { useParamId } from '@/shared/hook/useParamId'
import { ModalStoreProvider } from '@/shared/model/modal.type'
import { Loading } from '@/shared/ui/Loading'

import { ErrorPage } from '../home/ErrorPage'

export const ChatRoom = () => {
  const boardId = useParamId()
  const { setInitialMessage } = useChatMessageActions()

  const {
    data: roomInformation,
    isPending,
    isError,
  } = useFetchChatRoomInformation({ urls: { boardId } })

  if (isPending) return <Loading />
  if (isError || !roomInformation) return <ErrorPage />

  const { militaryBranches, ownerNickname, boardTitle, messages } = roomInformation

  setInitialMessage(messages)

  return (
    <SidebarStoreProvider>
      <ModalStoreProvider>
        <Container>
          <ChatRoomHeader />
          <ChattingRoomProfile
            profileIconList={militaryBranches}
            ownerNickname={ownerNickname}
            title={boardTitle}
          />

          <ChatMessageList />
          <MessageInput />
        </Container>
      </ModalStoreProvider>
    </SidebarStoreProvider>
  )
}
