import { useUserData } from '@/entities/auth/model/auth.store'
import { usePostContent } from '@/features/post/post-detail/model/postDetail.store'
import { canJoinChatRoom } from '@/shared/lib/canJoinChatRoom'

export const useEnterChatButtonState = () => {
  const post = usePostContent()
  const user = useUserData()

  if (!post) return { isVisible: false, isDisabled: true, label: '' }

  const { currentPersonnel, totalPersonnel } = post.status

  const isFull = !canJoinChatRoom(currentPersonnel, totalPersonnel)
  const isMyPost = user?.nickname === post.author.nickname

  const isDisabled = isFull || isMyPost
  const label = isFull ? '모집 마감' : '채팅하기'

  return { isVisible: true, isDisabled, label }
}
