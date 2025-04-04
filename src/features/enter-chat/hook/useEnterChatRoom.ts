import { useNavigate } from 'react-router-dom'

import { useFetchEnteredChatRoom } from '@/entities/chat/api/useChat.query'
import type { OpenModal } from '@/shared/hook/useModal'
import { useParamId } from '@/shared/hook/useParamId'
import { MODAL_KEYS } from '@/shared/lib/constants'

export const useEnterChatRoom = (openModal: OpenModal) => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { refetch } = useFetchEnteredChatRoom({ urls: { boardId } })

  const enterChatRoom = async () => {
    const { isSuccess, isError, error } = await refetch()
    if (isSuccess) {
      navigate(`/chat/${boardId}`)
    } else if (isError) {
      const errorMessage = error.response?.data || '채팅방 입장에 실패했습니다.'
      openModal(MODAL_KEYS.error, errorMessage)
    }
  }

  return { enterChatRoom }
}
