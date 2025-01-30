import { useEffect } from 'react'

import { useParamId } from '@/hooks/useParamId'
import { usePostActions } from '@/stores/post'

import { usePostDetail } from '../query/usePostQuery'

export const useCarpoolInitialize = () => {
  const boardId = useParamId()
  const { data: carpoolDetail, isPending, isError } = usePostDetail({ urls: { boardId } })
  const { setPost } = usePostActions()

  useEffect(() => {
    if (carpoolDetail && !isPending && !isError) {
      setPost(carpoolDetail)
    }
  }, [carpoolDetail, isPending, isError, setPost])

  return { carpoolDetail, isPending, isError }
}
