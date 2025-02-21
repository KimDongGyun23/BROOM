import { ChatMessageList } from '@/components/domain/chatting/ChatMessageList'
import { ChatRoomHeader } from '@/components/domain/chatting/ChatRoomHeader'
import { ChattingRoomProfile } from '@/components/domain/chatting/ChattingRoomProfile'
import { Loading } from '@/components/view/Loading'
import { useParamId } from '@/hooks/useParamId'
import { useFetchChatRoomInformation } from '@/query/useChattingQuery'
import { useChatMessageActions } from '@/stores/chatMessage'
import { ModalStoreProvider } from '@/stores/modal'
import { Container } from '@/styles/commonStyles'

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

  console.log('roomInformation:', roomInformation)
  if (isError || !roomInformation) return <ErrorPage />

  if (roomInformation) setInitialMessage(roomInformation.messages)

  const { militaryBranches, ownerNickname, boardTitle } = roomInformation

  return (
    <ModalStoreProvider>
      <Container>
        <ChatRoomHeader />
        <ChattingRoomProfile
          profileIconList={militaryBranches}
          ownerNickname={ownerNickname}
          title={boardTitle}
        />

        <ChatMessageList />
        {/* <MessageBox /> */}
      </Container>
    </ModalStoreProvider>
  )
}
