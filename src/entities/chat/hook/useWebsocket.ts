import { useEffect, useRef, useState } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { Client } from '@stomp/stompjs'

import { instance } from '@/app/api'
import { useUserData } from '@/features/login/model/auth.store'
import { useParamId } from '@/shared/hook/useParamId'
import type { ChatMessage } from '@/shared/model/common.type'

import type { Message } from '../model/chat.type'
import { useChatMessageActions } from '../model/chatMessage.store'

const SERVER = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

type Ack = {
  status: string
  statusCode: number
  message: string
  senderNickname: string
  boardId: string
}

const createClient = (
  token: string,
  roomId: string,
  nickname: string,
  addMessage: (message: Message) => void,
  handleAck: (ack: Ack) => void,
) => {
  const client = new Client({
    brokerURL: `${SERVER}/chat`,
    connectHeaders: {
      host: '/',
      Authorization: token,
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      subscribeToTopic(roomId, client, addMessage)
      subscribeToAck(client, roomId, nickname, handleAck)
    },
    onWebSocketError: () => {
      throw new Error('예상치 못한 오류가 발생했습니다.')
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
        throw new Error('예상치 못한 오류가 발생했습니다.')
      }
    },
    { 'Content-Type': 'application/json' },
  )
}

const subscribeToAck = (
  client: Client,
  roomId: string,
  nickname: string,
  handleAck: (ack: Ack) => void,
) => {
  client.subscribe(
    `/queue/broom.ack.${nickname}.${roomId}`,
    (message) => {
      try {
        const ack = JSON.parse(message.body)
        handleAck(ack)
      } catch {
        throw new Error('ACK 처리 중 오류가 발생했습니다.')
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
  nickname: string,
) => {
  if (client && client.connected) {
    client.publish({
      destination: `/pub/chat.message`,
      headers: { Authorization: token },
      body: JSON.stringify({
        boardId: roomId,
        message: content,
        senderName: nickname,
      }),
    })
  }
}

export const useWebSocket = () => {
  const roomId = useParamId()
  const client = useRef<Client | null>(null)

  const resetRef = useRef<UseFormReset<ChatMessage> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const user = useUserData()
  const { addMessage } = useChatMessageActions()

  const token = instance.getAccessToken() as string

  const handleAck = (ack: Ack) => {
    if (ack.status === 'SUCCESS') {
      resetRef.current?.()
      resetRef.current = null
    } else if (ack.status === 'ERROR') {
      setError(ack.message)
    }
  }

  useEffect(() => {
    if (!user) return

    if (!client.current) {
      client.current = createClient(token, roomId, user.nickname, addMessage, handleAck)
      client.current.activate()
    }

    return () => {
      if (client.current) {
        client.current.deactivate()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, token])

  if (!user) return null

  return {
    client,
    sendMessage: (content: string) =>
      sendMessage(client.current, token, roomId, content, user.nickname),
    error,
  }
}
