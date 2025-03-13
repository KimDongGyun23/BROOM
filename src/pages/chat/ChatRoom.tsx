import { useRef } from 'react'

import { Container } from '@/app/style/commonStyles'
import { useFetchChatRoomInformation } from '@/entities/chat/api/useChat.query'
import { useChatMessageActions } from '@/entities/chat/model/chatMessage.store'
import { useParamId } from '@/shared/hook/useParamId'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { ChatRoomHeader } from '@/widgets/header/ChatRoomHeader'
import { ChatInput } from '@/widgets/input-field/ChatInput'
import { ChatMessageList } from '@/widgets/list/ChatMessageList'
import { ChattingRoomProfile } from '@/widgets/profile/ChattingRoomProfile'

export const ChatRoom = () => {
  const boardId = useParamId()
  const { setInitialMessage } = useChatMessageActions()
  const messageEndRef = useRef<HTMLDivElement | null>(null)

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
      <ChatMessageList messageEndRef={messageEndRef} />
      <ChatInput messageEndRef={messageEndRef} />
    </Container>
  )
}
