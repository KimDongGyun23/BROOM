import { useNavigate } from 'react-router-dom'

import { useFetchEnteredChatRoom } from '@/entities/chat/api/useChat.query'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

export const useEnterChatRoom = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { openModal } = useModalActions()

  const { refetch } = useFetchEnteredChatRoom({ urls: { boardId } })

  const enterChatRoom = async () => {
    const { isSuccess, error } = await refetch()

    if (isSuccess) {
      navigate(`/chat/${boardId}`)
    } else {
      const errorMessage = error?.response?.data || '채팅방 입장에 실패했습니다.'
      openModal(MODAL_KEYS.ENTER_CHAT_ERROR, errorMessage)
    }
  }

  return { enterChatRoom }
}
