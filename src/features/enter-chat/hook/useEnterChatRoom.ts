import { useNavigate } from 'react-router-dom'

import { useFetchEnteredChatRoom } from '@/features/chat/api/useChat.query'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

export const useEnterChatRoom = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { openOneButtonModal } = useModalActions()
  const { refetch } = useFetchEnteredChatRoom({ urls: { boardId } })

  const enterChatRoom = async () => {
    const { isSuccess, isError, error } = await refetch()
    if (isSuccess) {
      navigate(`/chat/${boardId}`)
    } else if (isError) {
      openOneButtonModal(error.message)
    }
  }

  return { enterChatRoom }
}
