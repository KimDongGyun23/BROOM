import { useFormContext } from 'react-hook-form'

import { useWebSocket } from '@/entities/chat/hook/useWebsocket'
import type { ChatMessage } from '@/shared/model/common.type'

export const useSendMessage = () => {
  const { reset, handleSubmit } = useFormContext<ChatMessage>()
  const { client, sendMessage } = useWebSocket()

  const handleSendMessage = ({ message }: ChatMessage) => {
    if (message.length !== 0) {
      if (client.current && client.current.connected) {
        sendMessage(message)
        reset()
      } else {
        console.log('WebSocket is not connected')
      }
    }
  }

  return { onSubmit: handleSubmit(handleSendMessage) }
}
