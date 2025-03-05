import { Container } from '@/app/style/commonStyles'
import { useFetchChatRoomInformation } from '@/entities/chat/api/useChat.query'
import { useChatMessageActions } from '@/entities/chat/model/chatMessage.store'
import { MessageInput } from '@/features/send-message/ui/MessageInput'
import { useParamId } from '@/shared/hook/useParamId'
import { Loading } from '@/shared/ui/Loading'
import { ChatMessageList } from '@/widgets/chat-room/ui/ChatMessageList'
import { ChatRoomHeader } from '@/widgets/chat-room/ui/ChatRoomHeader'
import { ChattingRoomProfile } from '@/widgets/chat-room/ui/ChattingRoomProfile'

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
  )
}
