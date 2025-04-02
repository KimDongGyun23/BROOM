import type { IMessage } from '@stomp/stompjs'
import { Client } from '@stomp/stompjs'

import type { Ack, Message } from '../model/chat.type'

const SUBSCRIPTION_PATHS = {
  chatRoom: (roomId: string) => `/topic/broom.chat.room.${roomId}`,
  ackQueue: (nickname: string, roomId: string) => `/queue/broom.ack.${nickname}.${roomId}`,
} as const

export const createChatClient = (
  brokerURL: string,
  token: string,
  roomId: string,
  nickname: string,
  handlers: {
    onMessage: (message: Message) => void
    onAck: (ack: Ack) => void
    onError: (error: string) => void
  },
) => {
  const client = new Client({
    brokerURL,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    connectHeaders: { Authorization: token },
    onConnect: () => {
      client.subscribe(SUBSCRIPTION_PATHS.chatRoom(roomId), (message) =>
        handleMessage(message, handlers.onMessage),
      )

      client.subscribe(SUBSCRIPTION_PATHS.ackQueue(nickname, roomId), (message) =>
        handleAck(message, handlers.onAck),
      )
    },
    onStompError: () => {
      handlers.onError('예기치 않은 오류가 발생했습니다.')
    },
    onWebSocketError: () => {
      handlers.onError('서버와의 연결이 끊어졌습니다')
    },
    onDisconnect: () => {
      handlers.onError('서버와의 연결이 끊어졌습니다')
    },
    onWebSocketClose: (event) => {
      if (event.code === 1006) {
        handlers.onError('네트워크 연결이 불안정합니다')
      }
    },
  })

  return client
}

const handleMessage = (message: IMessage, onMessage: (message: Message) => void) => {
  try {
    const parsed = JSON.parse(message.body)
    onMessage(parsed)
  } catch (error) {
    console.error('Message parsing error:', error)
  }
}

const handleAck = (message: IMessage, onAck: (ack: Ack) => void) => {
  try {
    const ack = JSON.parse(message.body)
    onAck(ack)
  } catch (error) {
    console.error('ACK parsing error:', error)
  }
}
