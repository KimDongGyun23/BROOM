import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useParamId } from '@/hooks/useParamId'
import { usePostActions } from '@/stores/post'
import { TAB_KEYS } from '@/utils/constants'

import { usePostDetail } from '../query/usePostQuery'

export const usePostDetailData = () => {
  const boardId = useParamId()
  const { pathname } = useLocation()
  const { data: postDetail, isPending, isError } = usePostDetail({ urls: { boardId } })
  const { setPost, setTab } = usePostActions()

  useEffect(() => {
    if (postDetail) {
      setPost({ ...postDetail })
      setTab(pathname.includes(TAB_KEYS[0]) ? 'carpool' : 'team')
    }
  }, [setPost, setTab, pathname, postDetail])

  return { postDetail, isPending, isError }
}
