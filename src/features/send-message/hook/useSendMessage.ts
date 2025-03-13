import type { RefObject } from 'react'
import type { UseFormReset } from 'react-hook-form'

import { useWebSocket } from '@/entities/chat/hook/useWebsocket'
import type { ChatMessage } from '@/shared/model/common.type'

export const useSendMessage = (
  messageEndRef: RefObject<HTMLDivElement>,
  reset: UseFormReset<ChatMessage>,
) => {
  const { client, sendMessage } = useWebSocket()

  const handleSendMessage = ({ message }: ChatMessage) => {
    if (message.length !== 0) {
      if (client.current && client.current.connected) {
        sendMessage(message)
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        reset()
      } else {
        console.log('WebSocket is not connected')
      }
    }
  }

  return { handleSendMessage }
}
