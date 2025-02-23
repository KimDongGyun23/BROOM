import { styled } from 'styled-components'

import { BookmarkIcon } from '@/shared/ui/icons/ActiveIcons'

import { useHandleBookmark } from '../hook/useHandleBookmark'
import { useIsBookmarked } from '../model/bookmark.store'

export const PostBookmarkButton = () => {
  const isBookmarked = useIsBookmarked()
  const handleToggleBookmark = useHandleBookmark()

  return (
    <BookmarkStyledButton type="button" onClick={handleToggleBookmark}>
      <BookmarkIcon active={isBookmarked} />
      <p className="label">북마크</p>
    </BookmarkStyledButton>
  )
}

const BookmarkStyledButton = styled.button`
  ${({ theme }) => theme.flexBox('column', 'center', undefined, 'xs')}
  flex-shrink: 0;

  .label {
    ${({ theme }) => theme.font(900, theme.colors.black[400])};
  }
`
