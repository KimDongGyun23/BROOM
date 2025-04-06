import { useEffect } from 'react'

import { useFetchPostDetail } from '@/entities/board/api/useBoard.query'
import { useParamId } from '@/shared/hook/useParamId'

import { usePostContentActions } from '../model/postDetail.store'

export const usePostDetailData = () => {
  const boardId = useParamId()

  const { data: fetchedPostData } = useFetchPostDetail({ urls: { boardId } })
  const { updatePostContent } = usePostContentActions()

  useEffect(() => {
    if (fetchedPostData) updatePostContent(fetchedPostData)
  }, [fetchedPostData, updatePostContent])
}
