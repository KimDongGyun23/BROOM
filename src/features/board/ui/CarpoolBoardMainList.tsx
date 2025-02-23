import { useIsFilteringActiveOnly } from '@/features/board/model/activeOnlyFilter.store'
import { useFetchCarpoolList } from '@/query/useCarpoolQuery'

import { PostList } from './PostList'

export const CarpoolBoardMainList = () => {
  const isFilteringActiveOnly = useIsFilteringActiveOnly()
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchCarpoolList({
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
