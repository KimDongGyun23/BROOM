import { useEffect, useRef } from 'react'
import { Client } from '@stomp/stompjs'

import { instance } from '@/query'
import { useChatMessageActions } from '@/stores/chatMessage'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

const SERVER = import.meta.env.VITE_PUBLIC_SERVER
// import { useMessageActions } from 'store/chatData'

export const useWebSocket = (roomId: string | undefined) => {
  const client = useRef<Client | null>(null)
  const { addMessage } = useChatMessageActions()

  const token = instance.getAccessToken() as string

  const connectHandler = () => {
    client.current = new Client({
      brokerURL: `wss://${SERVER}/chat`,
      connectHeaders: {
        host: '/',
        Authorization: token,
      },
      onConnect: () => {
        client.current?.subscribe(
          `/exchange/chat.exchange/chat.room.${roomId}`,
          (message) => {
            addMessage(JSON.parse(message.body))
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
          chatRoomId: roomId,
          content: content,
          senderId: getSessionStorageItem(SESSION_KEYS.NICKNAME),
        }),
      })
    }
  }

  useEffect(() => {
    connectHandler()
    return () => {
      client.current?.deactivate()
      console.log('WebSocket 연결 해제')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, token])

  return { client, sendMessage }
}
