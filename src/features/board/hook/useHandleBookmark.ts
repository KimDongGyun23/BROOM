import { useParamId } from '@/shared/hook/useParamId'

import { useAddBookmark, useDeleteBookmark } from '../api/useBoard.mutation'
import { useBookmarkActions, useIsBookmarked } from '../model/bookmark.store'

export const useHandleBookmark = () => {
  const boardId = useParamId()

  const isBookmarked = useIsBookmarked()
  const { toggleIsBookmarked } = useBookmarkActions()

  const { mutate: addBookmark } = useAddBookmark()
  const { mutate: removeBookmark } = useDeleteBookmark()

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark({ urls: { boardId } }, { onSuccess: toggleIsBookmarked })
    } else {
      addBookmark({ body: { boardId } }, { onSuccess: toggleIsBookmarked })
    }
  }
  return toggleBookmark
}
