import { useNavigate } from 'react-router-dom'

import { PostBottom } from '@/components/view/post/PostBottom'
import { useParamId } from '@/hooks/useParamId'
import { useTeamChattingId } from '@/services/query/useChattingQuery'
import { useDeleteBookmark, useSetBookmark } from '@/services/query/usePostQuery'
import { usePost, usePostActions } from '@/stores/post'
import { TAB_KEYS } from '@/utils/constants'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

export const TeamDetailFooter = () => {
  const boardId = useParamId()
  const post = usePost()
  const navigate = useNavigate()

  const { setPost } = usePostActions()
  const { mutate: chattingMutation } = useTeamChattingId()
  const { mutate: setBookmark } = useSetBookmark()
  const { mutate: deleteBookmark } = useDeleteBookmark()

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

  const handleBookmark = () => {
    if (post && post.status.bookmark) {
      setBookmark(
        { body: { boardId } },
        { onSuccess: () => setPost({ ...post, status: { ...post.status, bookmark: false } }) },
      )
    } else if (post && !post.status.bookmark) {
      deleteBookmark(
        { urls: { boardId } },
        { onSuccess: () => setPost({ ...post, status: { ...post.status, bookmark: true } }) },
      )
    }
  }

  if (!post) return null

  return <PostBottom onBookmark={handleBookmark} onChatStart={handleClickChatting} />
}
