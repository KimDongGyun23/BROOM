import { useNavigate } from 'react-router-dom'

import { useSidebarActions } from '@/features/chat-sidebar/model/sidebar.store'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

import { useExitChatRoomMutation } from '../api/exitChatRoom.mutation'

export const useExitChatRoom = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { mutate: exitRoom } = useExitChatRoomMutation()

  const { openOneButtonModal, closeModal } = useModalActions()
  const { closeSidebar } = useSidebarActions()

  const handleClickExitRoom = () => {
    exitRoom(
      { urls: { boardId } },
      {
        onSuccess: () => {
          closeModal()
          closeSidebar()
          navigate('/chat')
        },
        onError: (error) => openOneButtonModal(error.message, false),
      },
    )
  }

  return handleClickExitRoom
}
