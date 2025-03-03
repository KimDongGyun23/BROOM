import { useAddBookmark, useDeleteBookmark } from '@/features/board/api/useBoard.mutation'
import { usePostDetail } from '@/features/board/model/postDetail.store'
import { useParamId } from '@/shared/hook/useParamId'
import { useModalActions } from '@/shared/model/modal.store'

export const useBookmark = () => {
  const boardId = useParamId()
  const postDetail = usePostDetail()
  const isBookmarked = postDetail?.status.bookmark
  const { openOneButtonModal } = useModalActions()

  const { mutate: addBookmark } = useAddBookmark()
  const { mutate: removeBookmark } = useDeleteBookmark()

  const toggleBookmark = () => {
    if (isBookmarked)
      removeBookmark(
        { urls: { boardId } },
        {
          onSuccess: (response) => openOneButtonModal(response, true),
          onError: (error) => openOneButtonModal(error.message, false),
        },
      )
    else
      addBookmark(
        { body: { boardId } },
        {
          onSuccess: (response) => openOneButtonModal(response, true),
          onError: (error) => openOneButtonModal(error.message, false),
        },
      )
  }

  return { isBookmarked, toggleBookmark }
}
