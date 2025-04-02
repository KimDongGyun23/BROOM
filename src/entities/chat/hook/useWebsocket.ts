/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { ActivationState, type Client } from '@stomp/stompjs'

import { instance } from '@/app/api'
import { useUserData } from '@/features/login/model/auth.store'
import useModal from '@/shared/hook/useModal'
import { useParamId } from '@/shared/hook/useParamId'
import { MODAL_KEYS } from '@/shared/lib/constants'
import type { ChatMessage } from '@/shared/model/common.type'

import { type Ack, createChatClient } from '../lib/websocket.lib'
import { useChatMessageActions } from '../model/chatMessage.store'

const SERVER = import.meta.env.VITE_PUBLIC_SERVER_DOMAIN

export const useWebSocket = () => {
  const roomId = useParamId()
  const user = useUserData()
  const client = useRef<Client | null>(null)
  const resetRef = useRef<UseFormReset<ChatMessage> | null>(null)
  const { modalLabel, isModalOpen, openModal, closeModal } = useModal()

  const { addMessage } = useChatMessageActions()

  const token = instance.getAccessToken() as string

  const handleAck = (ack: Ack) => {
    if (ack.status === 'SUCCESS') {
      resetRef.current?.()
      resetRef.current = null
    } else {
      openModal(MODAL_KEYS.error, ack.message || '메시지 전송에 실패했습니다.')
    }
  }
  const handleConnectionError = (message: string) => {
    if (!isModalOpen(MODAL_KEYS.error)) {
      openModal(MODAL_KEYS.error, message)
    }
    client.current?.deactivate()
    setTimeout(() => client.current?.activate(), 5000)
  }

  useEffect(() => {
    if (!client.current && user) {
      client.current = createChatClient(`${SERVER}/chat`, token, roomId, user.nickname, {
        onMessage: addMessage,
        onAck: handleAck,
        onError: handleConnectionError,
      })

      client.current.activate()
    }

    return () => {
      if (client.current) {
        client.current.deactivate()
      }
    }
  }, [roomId, token])

  useEffect(() => {
    const interval = setInterval(() => {
      if (client.current && !client.current.connected) {
        handleConnectionError('연결이 종료되었습니다. 새로고침 후 재시도해주세요.')
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [handleConnectionError])

  const publishMessage = (content: string, reset: UseFormReset<ChatMessage>) => {
    if (!client.current?.active || client.current.state === ActivationState.INACTIVE) {
      openModal(MODAL_KEYS.error, '연결이 종료되었습니다. 새로고침 후 재시도해주세요.')
      return
    }

    if (!client.current?.connected || !user) {
      console.error('publishMessage 에러', client.current?.connected, user)
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
  }

  return {
    sendMessage: publishMessage,
    client,
    errorModalLabel: modalLabel(MODAL_KEYS.error),
    isErrorModalOpen: isModalOpen(MODAL_KEYS.error),
    closeErrorModal: closeModal,
  }
}
