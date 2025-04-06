import { styled } from 'styled-components'

import { BookmarkIcon } from '@/shared/ui/icons/ActiveIcons'

import { useBookmark } from '../model/useBookmark'

export const BookmarkButton = () => {
  const { isBookmarked, toggleBookmark } = useBookmark()

  return (
    <BookmarkStyledButton type="button" onClick={toggleBookmark}>
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
