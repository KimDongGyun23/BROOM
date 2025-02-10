import { useEffect, useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { useToggle } from '@/hooks/useToggle'
import { usePostListActions } from '@/stores/postList'
import { TAB_KEYS, TAB_UPPER_KEYS } from '@/utils/constants'

import { useSearchPostList } from '../query/usePostQuery'

export const usePostSearchData = () => {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const { setTab, setPost } = usePostListActions()
  const [showActiveOnly, toggleShowActiveOnly] = useToggle(false)

  const filterName = searchParams.get('filterName') || ''
  const searchName = searchParams.get('searchName') || ''

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
  } = useSearchPostList({
    urls: {
      category: currentTab,
      type: filterName,
      keyword: searchName,
      isAllShow: !showActiveOnly,
    },
  })

  useEffect(() => {
    if (postList) {
      const tabKey = pathname.includes(TAB_KEYS[0]) ? TAB_KEYS[0] : TAB_KEYS[1]
      setTab(tabKey)
      setPost(postList.pages.flatMap((page) => page.result) || [])
    }
  }, [postList, pathname, setTab, setPost])

  return {
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    showActiveOnly,
    toggleShowActiveOnly,
  }
}
