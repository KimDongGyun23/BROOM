import { PostList } from '@/entities/board/ui/PostList'
import { usePostRecruitingState } from '@/features/search-post/model/recruitingFilter.store'

import { useBoardMainList } from '../model/useBoardMainList'

export const BoardMainList = () => {
  const isRecruiting = usePostRecruitingState()
  const { postList, isPending, hasNextPage, fetchNextPage } = useBoardMainList()

  return (
    <PostList
      isPending={isPending}
      isRecruiting={isRecruiting}
      postList={postList}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}
