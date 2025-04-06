/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { type Client } from '@stomp/stompjs'

import { instance } from '@/app/api'
import { useUserData } from '@/features/login/model/auth.store'
import useModal from '@/shared/hook/useModal'
import { useParamId } from '@/shared/hook/useParamId'
import { MODAL_KEYS } from '@/shared/lib/constants'
import type { ChatMessage } from '@/shared/model/common.type'

import { createChatClient } from '../lib/websocket.lib'

import type { Ack } from './chat.type'
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

  const { addMessage } = useChatMessageActions()
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const client = useRef<Client | null>(null)
  const resetRef = useRef<UseFormReset<ChatMessage> | null>(null)
  const token = instance.getAccessToken() as string

  let reconnectAttempts = 0

  const handleAck = useCallback(
    (ack: Ack) => {
      if (ack.status === 'SUCCESS') {
        resetRef.current?.()
        resetRef.current = null
      } else {
        openModal(MODAL_KEYS.error, ack.message || '메시지 전송에 실패했습니다.')
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
      if (!isModalOpen(MODAL_KEYS.error)) {
        openModal(MODAL_KEYS.error, message)
      }

      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        client.current?.deactivate()
        openModal(MODAL_KEYS.confirm, '서버와의 연결이 끊어졌습니다')
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
        openModal(MODAL_KEYS.error, '서버와의 연결이 끊어졌습니다')
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

  return {
    sendMessage: publishMessage,
    modalLabel,
    isModalOpen,
    closeErrorModal: closeModal,
    handleMoveToPrevPage,
  }
}
