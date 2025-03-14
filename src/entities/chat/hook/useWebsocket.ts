import { useEffect, useRef } from 'react'
import { Client } from '@stomp/stompjs'

import { instance } from '@/app/api'

import { useParamId } from '../../../shared/hook/useParamId'
import { useChatMessageActions } from '../model/chatMessage.store'

const SERVER = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

export const useWebSocket = () => {
  const roomId = useParamId()
  const client = useRef<Client | null>(null)
  const { addMessage } = useChatMessageActions()

  const token = instance.getAccessToken() as string

  const connectHandler = () => {
    if (client.current?.connected) return

    client.current = new Client({
      brokerURL: `${SERVER}/chat`,
      connectHeaders: {
        host: '/',
        Authorization: token,
      },
      onConnect: () => {
        client.current?.subscribe(
          `/topic/broom.chat.room.${roomId}`,
          (message) => {
            const parsedMessage = JSON.parse(message.body)
            addMessage(parsedMessage)
          },
          { 'Content-Type': 'application/json' },
        )
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message'])
        console.error('Additional details: ' + frame.body)
      },
    })

    client.current.activate()
  }

  const sendMessage = (content: string) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: `/pub/chat.message`,
        headers: { Authorization: token },
        body: JSON.stringify({
          boardId: roomId,
          message: content,
        }),
      })
    } else {
      console.error('WebSocket is not connected')
    }
  }

  useEffect(() => {
    connectHandler()
    return () => {
      if (client.current) {
        client.current.deactivate()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, token])

  return { client, sendMessage }
}
