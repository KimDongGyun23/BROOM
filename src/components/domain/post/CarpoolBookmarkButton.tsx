import { styled } from 'styled-components'

import { BookmarkIcon } from '@/components/view/icons/ActiveIcons'
import { useParamId } from '@/hooks/useParamId'
import { useToggle } from '@/hooks/useToggle'
import { useAddBookmark, useDeleteBookmark } from '@/query/useCarpoolQuery'
import { usePostDetail, usePostDetailActions } from '@/stores/post'

const useHandleBookmark = () => {
  const boardId = useParamId()
  const post = usePostDetail()

  const { updatePostDetail } = usePostDetailActions()
  const { mutate: addBookmark } = useAddBookmark()
  const { mutate: removeBookmark } = useDeleteBookmark()

  const toggleBookmark = () => {
    if (!post) return
    const isCurrentBookmarked = post.status.bookmark

    if (isCurrentBookmarked) {
      removeBookmark(
        { urls: { boardId } },
        {
          onSuccess: () =>
            updatePostDetail({ ...post, status: { ...post.status, bookmark: false } }),
        },
      )
    } else {
      addBookmark(
        { body: { boardId } },
        {
          onSuccess: () =>
            updatePostDetail({ ...post, status: { ...post.status, bookmark: true } }),
        },
      )
    }
  }
  return toggleBookmark
}

type CarpoolBookmarkButtonProps = {
  initialIsBookmarked: boolean
}

export const CarpoolBookmarkButton = ({ initialIsBookmarked }: CarpoolBookmarkButtonProps) => {
  const handleToggleBookmark = useHandleBookmark()
  const [isBookmarked, toggleIsBookmarked] = useToggle(initialIsBookmarked)

  const handleClickBookmark = () => {
    handleToggleBookmark()
    toggleIsBookmarked()
  }

  return (
    <BookmarkStyledButton type="button" onClick={handleClickBookmark}>
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
