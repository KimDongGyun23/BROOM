import { useNavigate } from 'react-router-dom'

import { useParamId } from '@/hooks/useParamId'
import { useCarpoolChattingId } from '@/services/query/useChattingQuery'
import { useDeleteBookmark, useSetBookmark } from '@/services/query/usePostQuery'
import { usePostDetail, usePostDetailActions } from '@/stores/post'

import { PostBottom } from '../../view/post/PostBottom'

const useHandleBookmark = () => {
  const boardId = useParamId()
  const post = usePostDetail()

  const { setPostDetail } = usePostDetailActions()
  const { mutate: setBookmark } = useSetBookmark()
  const { mutate: deleteBookmark } = useDeleteBookmark()

  const handleBookmark = () => {
    if (post && post.status.bookmark) {
      deleteBookmark(
        { urls: { boardId } },
        {
          onSuccess: () => setPostDetail({ ...post, status: { ...post.status, bookmark: false } }),
        },
      )
    } else if (post && !post.status.bookmark) {
      setBookmark(
        { body: { boardId } },
        { onSuccess: () => setPostDetail({ ...post, status: { ...post.status, bookmark: true } }) },
      )
    }
  }
  return handleBookmark
}

const useHandleChatting = () => {
  const boardId = useParamId()
  const navigate = useNavigate()

  const { mutate: chattingMutation } = useCarpoolChattingId()

  const handleClickChatting = () => {
    chattingMutation(
      { urls: { carpoolBoardId: boardId.toString() } },
      {
        onSuccess: ({ chatRoomId }) => navigate(`/chatting/chatting-room/carpool/${chatRoomId}`),
      },
    )
  }

  return handleClickChatting
}

export const CarpoolDetailFooter = () => {
  const post = usePostDetail()
  const handleClickChatting = useHandleChatting()
  const handleBookmark = useHandleBookmark()

  if (!post || !post.status) return null

  return <PostBottom onBookmark={handleBookmark} onChatStart={handleClickChatting} />
}
