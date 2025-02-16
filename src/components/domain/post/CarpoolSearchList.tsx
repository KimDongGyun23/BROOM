import { useSearchParams } from 'react-router-dom'

import { useFetchCarpoolSearchList } from '@/query/useCarpoolQuery'
import { useIsFilteringActiveOnly } from '@/stores/activeOnlyFilter'
import { SEARCH_OPTIONS } from '@/utils/constants'

import { PostList } from './PostList'

export const CarpoolSearchList = () => {
  const [searchParams] = useSearchParams()
  const filterLabel = searchParams.get('filterName') || ''
  const searchKeyword = searchParams.get('searchName') || ''
  const filterKey = SEARCH_OPTIONS.find((option) => option.label === filterLabel)?.key

  const isFilteringActiveOnly = useIsFilteringActiveOnly()

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchCarpoolSearchList({
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
