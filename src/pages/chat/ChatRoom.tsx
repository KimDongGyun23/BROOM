import { Container } from '@/app/style/commonStyles'
import { useWebSocket } from '@/entities/chat/model/useWebsocket'
import { ChatMessageList } from '@/features/chat-room/ui/ChatMessageList'
import { ChatRoomHeader } from '@/features/chat-room/ui/ChatRoomHeader'
import { ChattingRoomProfile } from '@/features/chat-room/ui/ChattingRoomProfile'
import { ChatInput } from '@/widgets/input-field/ChatInput'

export const ChatRoom = () => {
  const { sendMessage, modalLabel, isModalOpen, handleMoveToPrevPage, closeErrorModal } =
    useWebSocket()

  return (
    <Container>
      <ChatRoomHeader handleMoveToPrevPage={handleMoveToPrevPage} />
      <ChattingRoomProfile />

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
