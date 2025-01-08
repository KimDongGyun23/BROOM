import { useNavigate } from 'react-router-dom'

import { SESSION_KEYS, TAB_KEYS } from '@/utils/constants'
import { setSessionStorageItem } from '@/utils/storage'

import { useTeamChattingId } from '../query/useChattingQuery'
import { useDeleteTeam, useTeamCheckFull } from '../query/useTeamQuery'

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
          setSessionStorageItem(SESSION_KEYS.ROOM_TYPE, TAB_KEYS[0])
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
