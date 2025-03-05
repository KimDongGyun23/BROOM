import { useFormContext } from 'react-hook-form'

import { useWebSocket } from '@/entities/chat/hook/useWebsocket'

export const useSendMessage = () => {
  const { reset, handleSubmit } = useFormContext<{ message: string }>()
  const { client, sendMessage } = useWebSocket()

  const handleSendMessage = ({ message }: { message: string }) => {
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
