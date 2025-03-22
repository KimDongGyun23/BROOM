import { useEffect, useRef } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { Client } from '@stomp/stompjs'

import { instance } from '@/app/api'
import { useParamId } from '@/shared/hook/useParamId'
import type { ChatMessage } from '@/shared/model/common.type'

import type { Message } from '../model/chat.type'
import { useChatMessageActions } from '../model/chatMessage.store'

const SERVER = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

const createClient = (token: string, roomId: string, addMessage: (message: Message) => void) => {
  const client = new Client({
    brokerURL: `${SERVER}/chat`,
    connectHeaders: {
      host: '/',
      Authorization: token,
    },
    onConnect: () => {
      subscribeToTopic(roomId, client, addMessage)
    },
    onDisconnect: () => {
      throw new Error('네트워크 상태를 확인해주세요.')
    },
    onWebSocketError: () => {
      throw new Error('오류가 발생했습니다.')
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message'])
      console.error('Additional details: ' + frame.body)
    },
  })
  return client
}

const subscribeToTopic = (
  roomId: string,
  client: Client,
  addMessage: (message: Message) => void,
) => {
  client.subscribe(
    `/topic/broom.chat.room.${roomId}`,
    (message) => {
      try {
        const parsedMessage = JSON.parse(message.body)
        addMessage(parsedMessage)
      } catch {
        throw new Error('오류가 발생했습니다.')
      }
    },
    { 'Content-Type': 'application/json' },
  )
}

const sendMessage = (
  client: Client | null,
  token: string,
  roomId: string,
  content: string,
  reset: UseFormReset<ChatMessage>,
) => {
  if (client && client.connected) {
    try {
      client.publish({
        destination: `/pub/chat.message`,
        headers: { Authorization: token },
        body: JSON.stringify({
          boardId: roomId,
          message: content,
        }),
      })
      reset()
    } catch (error) {
      console.error('메시지 전송에 실패했습니다.', error)
      throw new Error('메시지 전송에 실패했습니다.')
    }
  } else {
    console.error('WebSocket is not connected')
    throw new Error('네트워크 상태를 확인해주세요.')
  }
}

export const useWebSocket = () => {
  const roomId = useParamId()
  const client = useRef<Client | null>(null)

  const { addMessage } = useChatMessageActions()

  const token = instance.getAccessToken() as string

  useEffect(() => {
    if (!client.current) {
      client.current = createClient(token, roomId, addMessage)
      client.current.activate()
    }

    return () => {
      if (client.current) {
        client.current.deactivate()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, token])

  return {
    client,
    sendMessage: (content: string, reset: UseFormReset<ChatMessage>) => {
      try {
        sendMessage(client.current, token, roomId, content, reset)
      } catch (error) {
        console.error('메시지 전송에 실패했습니다.', error)
        alert('메시지 전송에 실패했습니다. 네트워크 상태를 확인해주세요.')
      }
    },
  }
}
