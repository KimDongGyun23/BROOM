import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useToggle } from '@/hooks/useToggle'
import { usePostListActions } from '@/stores/postList'
import { SEARCH_OPTIONS } from '@/utils/constants'

import { useSearchPostList } from '../query/usePostQuery'

export const usePostSearchData = () => {
  const [searchParams] = useSearchParams()
  const { setPostList } = usePostListActions()
  const [showActiveOnly, toggleShowActiveOnly] = useToggle(false)

  const filterNameLabel = searchParams.get('filterName') || ''
  const filterKey = SEARCH_OPTIONS.find((option) => option.label === filterNameLabel)?.key || ''
  const searchName = searchParams.get('searchName') || ''

  const {
    data: postList,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useSearchPostList({
    urls: {
      type: filterKey,
      keyword: searchName,
      isAllShow: !showActiveOnly,
    },
  })

  useEffect(() => {
    if (postList) setPostList(postList.pages.flatMap((page) => page.result) || [])
  }, [postList, setPostList])

  return {
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    showActiveOnly,
    toggleShowActiveOnly,
  }
}
