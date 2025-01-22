import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { BookmarkIcon } from '@/components/view/icons/ActiveIcons'
import { useToggle } from '@/hooks/useToggle'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

type PostBottomProps = {
  isMyPost?: boolean
  disabled?: boolean
  initialIsBookmarked?: boolean
  onBookmark: VoidFunction
  onChatStart: VoidFunction
}

export const PostBottom = ({
  isMyPost = false,
  disabled = false,
  initialIsBookmarked = false,
  onBookmark,
  onChatStart,
}: PostBottomProps) => {
  const session = !!getSessionStorageItem(SESSION_KEYS.LOGIN)
  const [isBookmarked, setIsBookmarked] = useToggle(initialIsBookmarked)

  const handleClickBookmark = () => {
    onBookmark()
    setIsBookmarked()
  }

  if (!session) return null
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
        disabled={disabled}
      >
        {disabled ? '모집 마감' : '채팅하기'}
      </StyledButton>
    </BottomContainer>
  )
}

const BottomContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xl')};
  ${({ theme }) => theme.boxShadow('md')};
  ${({ theme }) => theme.padding('sm', 'lg', 'xl', 'lg')};
  width: 100%;
`

const BookmarkButton = styled.button`
  ${({ theme }) => theme.flexBox('column', 'center', undefined, xs)}
  flex-shrink: 0;

  .label {
    ${({ theme }) => theme.font(900, theme.colors.black[400])};
  }
`

const StyledButton = styled(Button)`
  flex-grow: 1;
`
