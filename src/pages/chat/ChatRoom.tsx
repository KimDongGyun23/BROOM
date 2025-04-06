import { Container } from '@/app/style/commonStyles'
import { useWebSocket } from '@/features/chat/chat-room/model/useWebsocket'
import { ChatInput } from '@/features/chat/chat-room/ui/ChatInput'
import { ChatMessageList } from '@/features/chat/chat-room/ui/ChatMessageList'
import { ChatRoomHeader } from '@/features/chat/chat-room/ui/ChatRoomHeader'
import { ChattingRoomProfile } from '@/features/chat/chat-room/ui/ChattingRoomProfile'

export const ChatRoom = () => {
  const { sendMessage, handleMoveToPrevPage } = useWebSocket()

  return (
    <Container>
      <ChatRoomHeader handleMoveToPrevPage={handleMoveToPrevPage} />
      <ChattingRoomProfile />

      <ChatMessageList />

      <ChatInput sendMessage={sendMessage} handleMoveToPrevPage={handleMoveToPrevPage} />
    </Container>
  )
}
