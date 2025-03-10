import { Container } from '@/app/style/commonStyles'
import { useFetchChatRoomInformation } from '@/entities/chat/api/useChat.query'
import { useChatMessageActions } from '@/entities/chat/model/chatMessage.store'
import { MessageInput } from '@/features/send-message/ui/MessageInput'
import { useParamId } from '@/shared/hook/useParamId'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { ChatMessageList } from '@/widgets/chat-room/ui/ChatMessageList'
import { ChatRoomHeader } from '@/widgets/chat-room/ui/ChatRoomHeader'
import { ChattingRoomProfile } from '@/widgets/chat-room/ui/ChattingRoomProfile'

export const ChatRoom = () => {
  const boardId = useParamId()
  const { setInitialMessage } = useChatMessageActions()

  const { data: roomInformation } = useFetchChatRoomInformation({ urls: { boardId } })

  if (!roomInformation) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

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
