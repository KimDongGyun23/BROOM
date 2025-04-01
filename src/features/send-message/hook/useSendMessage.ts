import type { UseFormReset } from 'react-hook-form'

import { useWebSocket } from '@/entities/chat/hook/useWebsocket'
import type { ChatMessage } from '@/shared/model/common.type'

export const useSendMessage = (reset: UseFormReset<ChatMessage>) => {
  const { sendMessage, isConnected } = useWebSocket()

  const handleSendMessage = ({ message }: ChatMessage) => {
    if (message.length !== 0) {
      if (isConnected) {
        sendMessage(message, reset)
      }
    }
  }

  return { handleSendMessage }
}
