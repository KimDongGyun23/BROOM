import { Container } from '@/app/style/commonStyles'
import { ChatMessageList } from '@/components/domain/chatting/ChatMessageList'
import { ChatRoomHeader } from '@/components/domain/chatting/ChatRoomHeader'
import { ChattingRoomProfile } from '@/components/domain/chatting/ChattingRoomProfile'
import { MessageInput } from '@/components/domain/chatting/MessageInput'
import { Loading } from '@/components/view/Loading'
import { useParamId } from '@/hooks/useParamId'
import { useFetchChatRoomInformation } from '@/query/useChattingQuery'
import { useChatMessageActions } from '@/stores/chatMessage'
import { ModalStoreProvider } from '@/stores/modal'
import { SidebarStoreProvider } from '@/stores/\bsidebar'

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
