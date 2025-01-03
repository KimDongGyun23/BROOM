import { useNavigate } from 'react-router-dom'

import { useTeammateChattingId, useTeammateCheckFull } from '@/queries'
import { useDeleteTeammate } from '@/services/query'
import { SESSION_ROOM_TYPE, setSessionStorageItem, TAB_LIST_EN } from '@/utils'

export const useTeammateDetailActions = (id: number, isFull: boolean) => {
  const navigate = useNavigate()
  const { mutate: chattingMutation } = useTeammateChattingId()
  const { mutate: checkFullMutation } = useTeammateCheckFull()
  const { mutate: deleteMutation } = useDeleteTeammate()

  const handleCheckFull = () => {
    checkFullMutation({ body: { full: !isFull }, urls: { teamBoardId: id } })
  }

  const handleEdit = () => navigate(`/teammate/edit/${id}`)

  const handleDelete = () => {
    deleteMutation(
      { urls: { teamBoardId: id } },
      {
        onSuccess: () => navigate('/teammate', { replace: true }),
      },
    )
  }

  const handleClickChatting = () => {
    chattingMutation(
      { urls: { teamBoardId: id.toString() } },
      {
        onSuccess: ({ chatRoomId }) => {
          setSessionStorageItem(SESSION_ROOM_TYPE, TAB_LIST_EN[0])
          navigate(`/chatting/chatting-room/teammate/${chatRoomId}`)
        },
      },
    )
  }

  return {
    handleCheckFull,
    handleEdit,
    handleDelete,
    handleClickChatting,
  }
}
