import { useFetchPostList } from '@/features/board/api/useBoard.query'
import { useIsFilteringActiveOnly } from '@/features/board/model/activeOnlyFilter.store'

import { PostList } from './PostList'

export const BoardMainList = () => {
  const isFilteringActiveOnly = useIsFilteringActiveOnly()
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchPostList({
    urls: { recruiting: isFilteringActiveOnly },
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
