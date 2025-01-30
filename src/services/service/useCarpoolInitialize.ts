import { useEffect } from 'react'

import { useParamId } from '@/hooks/useParamId'
import { usePostActions } from '@/stores/post'
import { formatDate } from '@/utils/formatDate'

import { usePostDetail } from '../query/usePostQuery'

export const useCarpoolInitialize = () => {
  const boardId = useParamId()
  const { data: carpoolDetail, isPending, isError } = usePostDetail({ urls: { boardId } })
  const { setPost } = usePostActions()

  useEffect(() => {
    if (carpoolDetail && !isPending && !isError) {
      setPost({
        ...carpoolDetail,
        createdAt: formatDate(carpoolDetail.createdAt, 'dateTime'),
        time: formatDate(carpoolDetail.time, 'shortTime'),
      })
    }
  }, [carpoolDetail, isPending, isError, setPost])

  return { carpoolDetail, isPending, isError }
}
