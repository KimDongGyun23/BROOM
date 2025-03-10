import { usePostDetail } from '@/entities/board/model/postDetail.store'
import type { OpenModal } from '@/shared/hook/useModal'
import { useParamId } from '@/shared/hook/useParamId'
import { MODAL_KEYS } from '@/shared/lib/constants'

import { useAddBookmarkMutation, useDeleteBookmarkMutation } from '../api/useBookmark.mutation'

export const useBookmark = (openModal: OpenModal) => {
  const boardId = useParamId()
  const postDetail = usePostDetail()

  const isBookmarked = postDetail?.status.bookmark

  const { mutate: addBookmark } = useAddBookmarkMutation()
  const { mutate: removeBookmark } = useDeleteBookmarkMutation()

  const toggleBookmark = () => {
    if (isBookmarked)
      removeBookmark(
        { urls: { boardId } },
        { onSuccess: (response) => openModal(MODAL_KEYS.success, response) },
      )
    else
      addBookmark(
        { body: { boardId } },
        { onSuccess: (response) => openModal(MODAL_KEYS.success, response) },
      )
  }

  return { isBookmarked, toggleBookmark }
}
