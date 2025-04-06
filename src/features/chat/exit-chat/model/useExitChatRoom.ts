import { useNavigate } from 'react-router-dom'

import { useSidebarActions } from '@/entities/chat/model/sidebar.store'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

import { useExitChatRoomMutation } from '../api/useExitChatRoom.mutation'

export const useExitChatRoom = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { closeModal } = useModalActions()
  const { closeSidebar } = useSidebarActions()

  const { mutate: exitRoom } = useExitChatRoomMutation()

  const handleClickExitRoom = () => {
    exitRoom(
      { urls: { boardId } },
      {
        onSuccess: () => {
          closeModal()
          closeSidebar()
          navigate('/chat')
        },
      },
    )
  }

  return { handleClickExitRoom }
}
