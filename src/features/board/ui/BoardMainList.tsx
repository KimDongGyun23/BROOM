import { useFetchPostList } from '@/features/board/api/useBoard.query'
import { useIsRecruiting } from '@/features/filter/model/recruiting.store'
import { formatDate } from '@/shared/lib/formatDate'

import { useDateFilter } from '../model/dateFilter.store'

import { PostList } from './PostList'

export const BoardMainList = () => {
  const dateFilter = useDateFilter()
  const isRecruiting = useIsRecruiting()

  const formattedDate = dateFilter
    ? formatDate(`${new Date().getFullYear()}.${dateFilter}`, 'default')
    : null

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchPostList({
    urls: {
      title: null,
      place: null,
      trainingDate: formattedDate || null,
      recruiting: isRecruiting,
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
