import { styled } from 'styled-components'

import { useIsMyPost, usePostDetail } from '@/entities/board/model/postDetail.store'
import { canJoinChatRoom } from '@/shared/lib/canJoinChatRoom'
import { Button } from '@/shared/ui/Button'

import { useEnterChatRoom } from '../hook/useEnterChatRoom'

export const EnterChatButton = () => {
  const post = usePostDetail()
  const isMyPost = useIsMyPost()
  const { enterChatRoom } = useEnterChatRoom()

  if (!post) return null

  const { currentPersonnel, totalPersonnel } = post.status
  const isFull = !canJoinChatRoom(currentPersonnel, totalPersonnel)

  return (
    <StyledButton
      secondary={isFull || isMyPost}
      size="sm"
      onClick={enterChatRoom}
      disabled={isFull || isMyPost}
    >
      {isFull ? '모집 마감' : '채팅하기'}
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  flex-grow: 1;
`
