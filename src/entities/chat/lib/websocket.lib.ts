import type { IMessage } from '@stomp/stompjs'
import { Client } from '@stomp/stompjs'

import type { Ack, Message, WebSocketParams } from '../model/chat.type'

const SUBSCRIPTION_PATHS = {
  chatRoom: (roomId: string) => `/topic/broom.chat.room.${roomId}`,
  ackQueue: (nickname: string, roomId: string) => `/queue/broom.ack.${nickname}.${roomId}`,
} as const

const parseMessage = <T>(message: IMessage): T | null => {
  try {
    return JSON.parse(message.body)
  } catch (error) {
    console.error('Message parsing error:', error)
    return null
  }
}

export const createChatClient = (config: WebSocketParams) => {
  const client = new Client({
    brokerURL: config.brokerURL,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    connectHeaders: { Authorization: config.token },

    onConnect: () => {
      client.subscribe(SUBSCRIPTION_PATHS.chatRoom(config.roomId), (message) => {
        const parsedMessage = parseMessage<Message>(message)
        return parsedMessage && config.handlers.onMessage(parsedMessage!)
      })

      client.subscribe(SUBSCRIPTION_PATHS.ackQueue(config.nickname, config.roomId), (message) => {
        const parsedMessage = parseMessage<Ack>(message)
        return parsedMessage && config.handlers.onAck(parsedMessage!)
      })
    },

    onStompError: () => config.handlers.onError('예기치 않은 오류가 발생했습니다.'),
    onWebSocketError: () => config.handlers.onError('서버와의 연결이 끊어졌습니다'),
    onDisconnect: () => config.handlers.onError('서버와의 연결이 끊어졌습니다'),
    onWebSocketClose: (event) => {
      if (event.code === 1006) config.handlers.onError('네트워크 연결이 불안정합니다')
    },
  })

  return client
}
