import { useNavigate } from 'react-router-dom'

import { useParamId } from '@/hooks/useParamId'
import { useCarpoolChattingId } from '@/services/query/useChattingQuery'
import { TAB_KEYS } from '@/utils/constants'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

import { PostBottom } from '../../view/post/PostBottom'

export const CarpoolDetailFooter = () => {
  const boardId = useParamId()
  const navigate = useNavigate()
  const { mutate: chattingMutation } = useCarpoolChattingId()

  const handleClickChatting = () => {
    chattingMutation(
      { urls: { carpoolBoardId: boardId.toString() } },
      {
        onSuccess: ({ chatRoomId }) => {
          setSessionStorageItem(SESSION_KEYS.ROOM_TYPE, TAB_KEYS[0])
          navigate(`/chatting/chatting-room/carpool/${chatRoomId}`)
        },
      },
    )
  }

  return <PostBottom onBookmark={() => {}} onChatStart={handleClickChatting} />
}
