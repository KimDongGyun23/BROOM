import { useNavigate } from 'react-router-dom'

import { PostBottom } from '@/components/view/post/PostBottom'
import { useParamId } from '@/hooks/useParamId'
import { useTeamChattingId } from '@/services/query/useChattingQuery'
import { TAB_KEYS } from '@/utils/constants'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

export const TeamDetailFooter = () => {
  const boardId = useParamId()
  const navigate = useNavigate()
  const { mutate: chattingMutation } = useTeamChattingId()

  const handleClickChatting = () => {
    chattingMutation(
      { urls: { teamBoardId: boardId.toString() } },
      {
        onSuccess: ({ chatRoomId }) => {
          setSessionStorageItem(SESSION_KEYS.ROOM_TYPE, TAB_KEYS[1])
          navigate(`/chatting/chatting-room/team/${chatRoomId}`)
        },
      },
    )
  }

  return <PostBottom onBookmark={() => {}} onChatStart={handleClickChatting} />
}
