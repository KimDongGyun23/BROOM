import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useToggle } from '@/hooks/useToggle'
import { usePostListActions } from '@/stores/postList'

import { usePostList } from '../query/usePostQuery'

export const usePostListData = () => {
  const { pathname } = useLocation()
  const { setPostList } = usePostListActions()
  const [showActiveOnly, toggleShowActiveOnly] = useToggle(false)

  const {
    data: postList,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  } = usePostList({ urls: { isAllShow: !showActiveOnly } })

  useEffect(() => {
    if (postList) setPostList(postList.pages.flatMap((page) => page.result) || [])
  }, [pathname, postList, setPostList])

  return {
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    showActiveOnly,
    toggleShowActiveOnly,
  }
}
