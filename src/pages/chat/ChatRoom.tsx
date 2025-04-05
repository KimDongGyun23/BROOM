import { Container } from '@/app/style/commonStyles'
import { useFetchChatRoomInformation } from '@/entities/chat/api/useChat.query'
import { useWebSocket } from '@/entities/chat/hook/useWebsocket'
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

  const { data: roomInformation } = useFetchChatRoomInformation({ urls: { boardId } })

  const { sendMessage, modalLabel, isModalOpen, handleMoveToPrevPage, closeErrorModal } =
    useWebSocket()

  if (!roomInformation) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  const { militaryBranches, ownerNickname, boardTitle, messages } = roomInformation

  setInitialMessage(messages)

  return (
    <Container>
      <ChatRoomHeader handleMoveToPrevPage={handleMoveToPrevPage} />
      <ChattingRoomProfile
        profileIconList={militaryBranches}
        ownerNickname={ownerNickname}
        title={boardTitle}
      />
      <ChatMessageList />
      <ChatInput
        sendMessage={sendMessage}
        modalLabel={modalLabel}
        isModalOpen={isModalOpen}
        handleMoveToPrevPage={handleMoveToPrevPage}
        closeErrorModal={closeErrorModal}
      />
    </Container>
  )
}
