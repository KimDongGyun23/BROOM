import { useEffect } from 'react'

import { useFetchPostDetail } from '@/entities/board/api/useBoard.query'
import { useParamId } from '@/shared/hook/useParamId'

import { usePostDetailContentActions } from '../model/postDetail.store'

export const usePostDetailData = () => {
  const boardId = useParamId()

  const { data: fetchedPostData } = useFetchPostDetail({ urls: { boardId } })
  const { updatePostDetail } = usePostDetailContentActions()

  useEffect(() => {
    if (fetchedPostData) updatePostDetail(fetchedPostData)
  }, [fetchedPostData, updatePostDetail])
}
