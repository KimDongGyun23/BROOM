import { useEffect } from 'react'

import { useParamId } from '@/hooks/useParamId'
import { usePostActions } from '@/stores/post'

import { usePostDetail } from '../query/usePostQuery'

export const usePostDetailData = () => {
  const boardId = useParamId()
  const { data: postDetail, isPending, isError } = usePostDetail({ urls: { boardId } })
  const { setPost } = usePostActions()

  useEffect(() => {
    if (postDetail) setPost({ ...postDetail })
  }, [setPost, postDetail])

  return { postDetail, isPending, isError }
}
