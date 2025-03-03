import { useFetchPostList } from '@/features/board/api/useBoard.query'
import { useIsFilteringActiveOnly } from '@/features/board/model/activeOnlyFilter.store'
import { formatDate } from '@/shared/lib/formatDate'

import { useDateFilter } from '../model/dateFilter.store'

import { PostList } from './PostList'

export const BoardMainList = () => {
  const dateFilter = useDateFilter()
  const isFilteringActiveOnly = useIsFilteringActiveOnly()

  const formattedDate = dateFilter
    ? formatDate(`${new Date().getFullYear()}.${dateFilter}`, 'default')
    : null

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchPostList({
    urls: {
      title: '',
      place: '',
      trainingDate: formattedDate || null,
      recruiting: isFilteringActiveOnly,
    },
  })

  const postList = data?.pages.flatMap((page) => page.result) || []

  return (
    <PostList
      postList={postList}
      isPending={isPending}
      isError={isError}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}
