import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { useToggle } from '@/hooks/useToggle'
import { usePostListActions } from '@/stores/postList'
import { TAB_KEYS, TAB_UPPER_KEYS } from '@/utils/constants'

import { usePostList } from '../query/usePostQuery'

export const usePostListData = () => {
  const { pathname } = useLocation()
  const { setTab, setPost } = usePostListActions()
  const [showActiveOnly, toggleShowActiveOnly] = useToggle(false)

  const currentTab = useMemo(
    () => (pathname.includes(TAB_KEYS[0]) ? TAB_UPPER_KEYS[0] : TAB_UPPER_KEYS[1]),
    [pathname],
  )

  const {
    data: postList,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  } = usePostList({ urls: { category: currentTab, isAllShow: !showActiveOnly } })

  useEffect(() => {
    if (postList) {
      const tabKey = pathname.includes(TAB_KEYS[0]) ? TAB_KEYS[0] : TAB_KEYS[1]
      setTab(tabKey)
      setPost(postList.pages.flatMap((page) => page.result) || [])
    }
  }, [pathname, postList, setPost, setTab])

  return {
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    showActiveOnly,
    toggleShowActiveOnly,
  }
}
