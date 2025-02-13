import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { BookmarkIcon } from '@/components/view/icons/ActiveIcons'
import { useToggle } from '@/hooks/useToggle'
import { instance } from '@/services/query'
import { useIsMyPost, usePostDetail } from '@/stores/post'
import { canJoinChatRoom } from '@/utils/canJoinChatRoom'

type PostBottomProps = {
  onBookmark: VoidFunction
  onChatStart: VoidFunction
}

export const PostBottom = ({ onBookmark, onChatStart }: PostBottomProps) => {
  const post = usePostDetail()
  const isMyPost = useIsMyPost()
  const [isBookmarked, setIsBookmarked] = useToggle(post?.status.bookmark)
  const session = instance.hasToken()

  if (!post || !session) return null

  const isFull = !canJoinChatRoom(post.status.currentPersonnel, post.status.totalPersonnel)

  const handleClickBookmark = () => {
    onBookmark()
    setIsBookmarked()
  }

  return (
    <BottomContainer>
      <BookmarkButton type="button" onClick={handleClickBookmark}>
        <BookmarkIcon active={isBookmarked} />
        <p className="label">북마크</p>
      </BookmarkButton>
      <StyledButton
        secondary={isMyPost}
        size="sm"
        onClick={isMyPost ? undefined : onChatStart}
        disabled={isFull}
      >
        {isFull ? '모집 마감' : '채팅하기'}
      </StyledButton>
    </BottomContainer>
  )
}

const BottomContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xl')};
  ${({ theme }) => theme.boxShadow('md')};
  ${({ theme }) => theme.padding('sm', 'lg', 'xl')};
  width: 100%;
`

const BookmarkButton = styled.button`
  ${({ theme }) => theme.flexBox('column', 'center', undefined, 'xs')}
  flex-shrink: 0;

  .label {
    ${({ theme }) => theme.font(900, theme.colors.black[400])};
  }
`

const StyledButton = styled(Button)`
  flex-grow: 1;
`
