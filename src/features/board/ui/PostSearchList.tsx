import { useSearchParams } from 'react-router-dom'

import { useFetchPostSearchList } from '@/features/board/api/useBoard.query'
import { SEARCH_OPTIONS } from '@/features/board/config/post.constant'
import { useIsFilteringActiveOnly } from '@/features/board/model/activeOnlyFilter.store'
import { PostList } from '@/features/board/ui/PostList'

export const PostSearchList = () => {
  const [searchParams] = useSearchParams()
  const filterLabel = searchParams.get('filterName') || ''
  const searchKeyword = searchParams.get('searchName') || ''
  const filterKey = SEARCH_OPTIONS.find((option) => option.label === filterLabel)?.key

  const isFilteringActiveOnly = useIsFilteringActiveOnly()

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchPostSearchList({
    urls: {
      type: filterKey || '',
      keyword: searchKeyword,
      recruiting: isFilteringActiveOnly,
    },
  })

  const searchPostList = data?.pages.flatMap((page) => page.result) || []

  return (
    <PostList
      postList={searchPostList}
      isPending={isPending}
      isError={isError}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}
