import { useSearchParams } from 'react-router-dom'

import { SEARCH_OPTIONS } from '@/features/board/config/post.constant'
import { useIsFilteringActiveOnly } from '@/features/board/model/activeOnlyFilter.store'
import { PostList } from '@/features/board/ui/PostList'
import { formatDate } from '@/shared/lib/formatDate'

import { useFetchPostList } from '../api/useBoard.query'
import { useDateFilter } from '../model/dateFilter.store'

export const PostSearchList = () => {
  const [searchParams] = useSearchParams()
  const filterLabel = searchParams.get('filterName') || ''
  const searchKeyword = searchParams.get('searchName') || ''
  const filterKey = SEARCH_OPTIONS.find((option) => option.label === filterLabel)?.key

  const dateFilter = useDateFilter()
  const isFilteringActiveOnly = useIsFilteringActiveOnly()

  const formattedDate = dateFilter
    ? formatDate(`${new Date().getFullYear()}.${dateFilter}`, 'default')
    : null

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchPostList({
    urls: {
      title: filterKey === 'title' ? searchKeyword : null,
      place: filterKey === 'place' ? searchKeyword : null,
      trainingDate: formattedDate || null,
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
