import { useEffect, useRef } from 'react'
import { Client } from '@stomp/stompjs'

import { useChatMessageActions } from '@/features/chat/model/chatMessage.store'
import { instance } from '@/query'

import { useParamId } from '../../../shared/hook/useParamId'

const SERVER = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

export const useWebSocket = () => {
  const roomId = useParamId()
  const client = useRef<Client | null>(null)
  const { addMessage } = useChatMessageActions()

  const token = instance.getAccessToken() as string

  const connectHandler = () => {
    if (client.current?.connected) {
      console.log('WebSocket already connected')
      return
    }

    client.current = new Client({
      brokerURL: `${SERVER}/chat`,
      connectHeaders: {
        host: '/',
        Authorization: token,
      },
      onConnect: () => {
        console.log('WebSocket 연결 성공')
        client.current?.subscribe(
          `/exchange/broom.chat.exchange/broom.chat.room.${roomId}`,
          (message) => {
            const parsedMessage = JSON.parse(message.body)
            console.log(parsedMessage)
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
        client.current.deactivate().then(() => {
          console.log('WebSocket 연결 해제 완료')
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, token])

  return { client, sendMessage }
}
