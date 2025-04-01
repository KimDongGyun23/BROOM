import type { IMessage } from '@stomp/stompjs'
import { Client } from '@stomp/stompjs'

import type { Message } from '../model/chat.type'

export type Ack = {
  status: string
  statusCode: number
  message: string
  senderNickname: string
  boardId: string
}

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
    debug: function (str) {
      console.log(str)
    },
    onConnect: () => {
      client.subscribe(SUBSCRIPTION_PATHS.chatRoom(roomId), (message) =>
        handleMessage(message, handlers.onMessage),
      )

      client.subscribe(SUBSCRIPTION_PATHS.ackQueue(nickname, roomId), (message) =>
        handleAck(message, handlers.onAck),
      )
    },
    onStompError: (frame) => {
      handlers.onError(frame.headers['message'] || 'Unknown STOMP error')
    },
    onWebSocketError: () => {
      handlers.onError('WebSocket connection error')
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
