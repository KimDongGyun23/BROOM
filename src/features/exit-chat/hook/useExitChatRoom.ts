import { useNavigate } from 'react-router-dom'

import { useSidebarActions } from '@/features/chat-sidebar/model/sidebar.store'
import { useParamId } from '@/shared/hook/useParamId'

import { useExitChatRoomMutation } from '../api/exitChatRoom.mutation'

export const useExitChatRoom = (closeModal: VoidFunction) => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { mutate: exitRoom } = useExitChatRoomMutation()

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
      },
    )
  }

  return handleClickExitRoom
}
