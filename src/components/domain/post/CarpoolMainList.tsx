import { useFetchCarpoolList } from '@/query/useCarpoolQuery'
import { useIsFilteringActiveOnly } from '@/stores/activeOnlyFilter'

import { PostList } from './PostList'

export const CarpoolMainList = () => {
  const isFilteringActiveOnly = useIsFilteringActiveOnly()
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchCarpoolList({
    urls: { isAllShow: !isFilteringActiveOnly },
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
