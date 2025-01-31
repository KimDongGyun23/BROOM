import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useParamId } from '@/hooks/useParamId'
import { usePostActions } from '@/stores/post'
import { TAB_KEYS } from '@/utils/constants'
import { formatDate } from '@/utils/formatDate'

import { usePostDetail } from '../query/usePostQuery'

export const usePostInitialize = () => {
  const boardId = useParamId()
  const { pathname } = useLocation()
  const { data: postDetail, isPending, isError } = usePostDetail({ urls: { boardId } })
  const { setPost, setTab } = usePostActions()

  useEffect(() => {
    if (postDetail && !isPending && !isError) {
      setPost({
        ...postDetail,
        createdAt: formatDate(postDetail.createdAt, 'dateTime'),
        time: formatDate(postDetail.time, 'shortTime'),
      })
      setTab(pathname.startsWith(TAB_KEYS[0]) ? 'carpool' : 'team')
    }
  }, [postDetail, isPending, isError, setPost, setTab, pathname])

  return { postDetail, isPending, isError }
}
