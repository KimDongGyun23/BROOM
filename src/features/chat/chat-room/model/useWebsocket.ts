/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { type Client } from '@stomp/stompjs'

import { instance } from '@/app/api'
import { useUserData } from '@/entities/auth/model/auth.store'
import type { Ack } from '@/entities/chat/model/chat.type'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useParamId } from '@/shared/hook/useParamId'
import type { ChatMessage } from '@/shared/model/common.type'
import { useModalActions, useModalState } from '@/shared/model/modal.store'

import { createChatClient } from '../lib/websocket.lib'

import { useChatMessageActions } from './chatMessage.store'

const INITIAL_RECONNECT_DELAY = 1000
const MAX_RECONNECT_DELAY = 16000
const MAX_RECONNECT_ATTEMPTS = 5
const CONNECTION_CHECK_INTERVAL = 10000
const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN

export const useWebSocket = () => {
  const roomId = useParamId()
  const user = useUserData()
  const navigate = useNavigate()
  const modalState = useModalState()

  const { addMessage } = useChatMessageActions()
  const { openModal, closeModal } = useModalActions()

  const client = useRef<Client | null>(null)
  const resetRef = useRef<UseFormReset<ChatMessage> | null>(null)

  const token = instance.getAccessToken() as string
  const isModalOpen = modalState[MODAL_KEYS.CHAT_ERROR]?.isOpen || false

  let reconnectAttempts = 0

  const handleAck = useCallback(
    (ack: Ack) => {
      if (ack.status === 'SUCCESS') {
        resetRef.current?.()
        resetRef.current = null
      } else {
        openModal(MODAL_KEYS.CHAT_ERROR, ack.message || '메시지 전송에 실패했습니다.')
      }
    },
    [openModal],
  )

  const handleMoveToPrevPage = useCallback(() => {
    if (client.current) {
      client.current.deactivate()
      client.current = null
    }
    closeModal()
    navigate(-1)
  }, [navigate])

  const handleConnectionError = useCallback(
    (message: string) => {
      if (client.current === null) return

      if (!isModalOpen) {
        openModal(MODAL_KEYS.CHAT_ERROR, message)
      }

      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        client.current?.deactivate()
        openModal(MODAL_KEYS.CHAT_CONFIRM, '서버와의 연결이 끊어졌습니다')
        return
      }

      if (client.current) {
        client.current.deactivate()
      }

      const delay = Math.min(
        INITIAL_RECONNECT_DELAY * Math.pow(2, reconnectAttempts),
        MAX_RECONNECT_DELAY,
      )

      const randomDelay = delay + Math.floor(Math.random() * 3000)

      setTimeout(() => {
        if (client.current && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          client.current.activate()
          reconnectAttempts++
        }
      }, randomDelay)
    },
    [isModalOpen, openModal],
  )

  const publishMessage = useCallback(
    (content: string, reset: UseFormReset<ChatMessage>) => {
      if (content.length === 0) return

      if (!user || !client.current?.connected) {
        openModal(MODAL_KEYS.CHAT_ERROR, '서버와의 연결이 끊어졌습니다')
        return
      }

      resetRef.current = reset
      client.current.publish({
        destination: '/pub/chat.message',
        headers: { Authorization: token },
        body: JSON.stringify({
          boardId: roomId,
          message: content,
          senderName: user.nickname,
        }),
      })
    },
    [roomId, token, user, openModal],
  )

  useEffect(() => {
    if (!client.current && user) {
      client.current = createChatClient({
        brokerURL: `${SERVER_DOMAIN}/chat`,
        token,
        roomId,
        nickname: user.nickname,
        handlers: {
          onMessage: addMessage,
          onAck: handleAck,
          onError: handleConnectionError,
        },
      })

      client.current.activate()
    }
    return () => {
      if (client.current) {
        client.current.deactivate()
        client.current = null
      }
    }
  }, [roomId, token])

  useEffect(() => {
    const interval = setInterval(() => {
      if (client.current && !client.current.connected) {
        handleConnectionError('연결이 종료되었습니다. 새로고침 후 재시도해주세요.')
      }
    }, CONNECTION_CHECK_INTERVAL)

    return () => clearInterval(interval)
  }, [handleConnectionError])

  return { sendMessage: publishMessage, handleMoveToPrevPage }
}
