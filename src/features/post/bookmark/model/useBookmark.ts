import { usePostContent } from '@/features/post/post-detail/model/postDetail.store'
import { MODAL_KEYS } from '@/shared/config/modalKeys'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

import { useAddBookmarkMutation, useDeleteBookmarkMutation } from '../api/useBookmark.mutation'

const useIsBookmarked = () => {
  const post = usePostContent()
  const isBookmarked = post?.status.bookmark

  return isBookmarked
}

export const useBookmark = () => {
  const boardId = useParamId()
  const isBookmarked = useIsBookmarked()

  const { openModal } = useModalActions()

  const { mutate: addBookmark } = useAddBookmarkMutation()
  const { mutate: removeBookmark } = useDeleteBookmarkMutation()

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(
        { urls: { boardId } },
        { onSuccess: (response) => openModal(MODAL_KEYS.BOOKMARK_POST, response) },
      )
    } else {
      addBookmark(
        { body: { boardId } },
        { onSuccess: (response) => openModal(MODAL_KEYS.BOOKMARK_POST, response) },
      )
    }
  }

  return { isBookmarked, toggleBookmark }
}
