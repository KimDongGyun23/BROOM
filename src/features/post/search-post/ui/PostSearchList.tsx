import { PostList } from '@/entities/board/ui/PostList'

import { useSearchRecruitingState } from '../model/recruitingFilter.store'
import { useSearchPostList } from '../model/useSearchPostList'

export const PostSearchList = () => {
  const isRecruiting = useSearchRecruitingState()
  const { searchPostList, isPending, hasNextPage, fetchNextPage } = useSearchPostList()

  return (
    <PostList
      isPending={isPending}
      isRecruiting={isRecruiting}
      postList={searchPostList}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}
