import { useNavigate } from 'react-router-dom'

import { useDeleteCarpool, useMarkCarpoolAsFull } from '@/services/query/useCarpoolQuery'
import { useCarpoolChattingId } from '@/services/query/useChattingQuery'
import { TAB_KEYS } from '@/utils/constants'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

export const useCarpoolDetailActions = (id: number, isFull: boolean) => {
  const navigate = useNavigate()
  const { mutate: chattingMutation } = useCarpoolChattingId()
  const { mutate: checkFullMutation } = useMarkCarpoolAsFull()
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
          setSessionStorageItem(SESSION_KEYS.ROOM_TYPE, TAB_KEYS[0])
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
