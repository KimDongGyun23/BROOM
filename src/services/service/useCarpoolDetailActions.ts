import { useNavigate } from 'react-router-dom'

import { useCarpoolChattingId } from '@/queries'
import { useCarpoolCheckFull, useDeleteCarpool } from '@/services/query'
import { SESSION_ROOM_TYPE, setSessionStorageItem, TAB_LIST_EN } from '@/utils'

export const useCarpoolDetailActions = (id: number, isFull: boolean) => {
  const navigate = useNavigate()
  const { mutate: chattingMutation } = useCarpoolChattingId()
  const { mutate: checkFullMutation } = useCarpoolCheckFull()
  const { mutate: deleteMutation } = useDeleteCarpool()

  const handleCheckFull = () => {
    checkFullMutation({ body: { full: !isFull }, urls: { carpoolBoardId: id } })
  }

  const handleEdit = () => navigate(`/carpool/edit/${id}`)

  const handleDelete = () => {
    deleteMutation(
      { urls: { carpoolBoardId: id } },
      {
        onSuccess: () => navigate('/carpool', { replace: true }),
      },
    )
  }

  const handleClickChatting = () => {
    chattingMutation(
      { urls: { carpoolBoardId: id.toString() } },
      {
        onSuccess: ({ chatRoomId }) => {
          setSessionStorageItem(SESSION_ROOM_TYPE, TAB_LIST_EN[0])
          navigate(`/chatting/chatting-room/carpool/${chatRoomId}`)
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
