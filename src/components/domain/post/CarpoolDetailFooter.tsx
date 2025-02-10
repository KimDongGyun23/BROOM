import { useNavigate } from 'react-router-dom'

import { useParamId } from '@/hooks/useParamId'
import { useCarpoolChattingId } from '@/services/query/useChattingQuery'
import { useDeleteBookmark, useSetBookmark } from '@/services/query/usePostQuery'
import { usePost, usePostActions } from '@/stores/post'
import { TAB_KEYS } from '@/utils/constants'
import { SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

import { PostBottom } from '../../view/post/PostBottom'

export const CarpoolDetailFooter = () => {
  const boardId = useParamId()
  const post = usePost()
  console.log(post)
  const navigate = useNavigate()

  const { setPost } = usePostActions()
  const { mutate: chattingMutation } = useCarpoolChattingId()
  const { mutate: setBookmark } = useSetBookmark()
  const { mutate: deleteBookmark } = useDeleteBookmark()

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

  const handleBookmark = () => {
    if (post && post.status.bookmark) {
      deleteBookmark(
        { urls: { boardId } },
        { onSuccess: () => setPost({ ...post, status: { ...post.status, bookmark: false } }) },
      )
    } else if (post && !post.status.bookmark) {
      setBookmark(
        { body: { boardId } },
        { onSuccess: () => setPost({ ...post, status: { ...post.status, bookmark: true } }) },
      )
    }
  }

  if (!post || !post.status) return null

  return <PostBottom onBookmark={handleBookmark} onChatStart={handleClickChatting} />
}
