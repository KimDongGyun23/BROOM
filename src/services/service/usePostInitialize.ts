import { useEffect } from 'react'

import { useParamId } from '@/hooks/useParamId'
import { usePostActions } from '@/stores/post'
import { formatDate } from '@/utils/formatDate'

import { usePostDetail } from '../query/usePostQuery'

export const usePostInitialize = () => {
  const boardId = useParamId()
  const { data: postDetail, isPending, isError } = usePostDetail({ urls: { boardId } })
  const { setPost } = usePostActions()

  useEffect(() => {
    if (postDetail && !isPending && !isError) {
      setPost({
        ...postDetail,
        createdAt: formatDate(postDetail.createdAt, 'dateTime'),
        time: formatDate(postDetail.time, 'shortTime'),
      })
    }
  }, [postDetail, isPending, isError, setPost])

  return { postDetail, isPending, isError }
}
