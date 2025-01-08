import { useNavigate } from 'react-router-dom'

import { useTeamChattingId, useTeamCheckFull } from '@/queries'
import { useDeleteTeam } from '@/services/query'
import { SESSION_ROOM_TYPE, setSessionStorageItem, TAB_LIST_EN } from '@/utils'

export const useTeamDetailActions = (id: number, isFull: boolean) => {
  const navigate = useNavigate()
  const { mutate: chattingMutation } = useTeamChattingId()
  const { mutate: checkFullMutation } = useTeamCheckFull()
  const { mutate: deleteMutation } = useDeleteTeam()

  const handleCheckFull = () => {
    checkFullMutation({ body: { full: !isFull }, urls: { teamBoardId: id } })
  }

  const handleEdit = () => navigate(`/team/edit/${id}`)

  const handleDelete = () => {
    deleteMutation(
      { urls: { teamBoardId: id } },
      {
        onSuccess: () => navigate('/team', { replace: true }),
      },
    )
  }

  const handleClickChatting = () => {
    chattingMutation(
      { urls: { teamBoardId: id.toString() } },
      {
        onSuccess: ({ chatRoomId }) => {
          setSessionStorageItem(SESSION_ROOM_TYPE, TAB_LIST_EN[0])
          navigate(`/chatting/chatting-room/team/${chatRoomId}`)
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
