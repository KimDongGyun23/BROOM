import { Container } from '@/app/style/commonStyles'
import { ChatMessageList } from '@/components/domain/chatting/ChatMessageList'
import { ChatRoomHeader } from '@/components/domain/chatting/ChatRoomHeader'
import { ChattingRoomProfile } from '@/components/domain/chatting/ChattingRoomProfile'
import { MessageInput } from '@/components/domain/chatting/MessageInput'
import { useFetchChatRoomInformation } from '@/query/useChattingQuery'
import { useParamId } from '@/shared/hook/useParamId'
import { useChatMessageActions } from '@/shared/model/chatMessage'
import { ModalStoreProvider } from '@/shared/model/modal'
import { SidebarStoreProvider } from '@/shared/model/sidebar'
import { Loading } from '@/shared/ui/Loading'

import { ErrorPage } from '../../../pages/home/ErrorPage'

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
