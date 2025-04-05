import { useFetchPostList } from '@/entities/board/api/useBoard.query'
import { usePostDateTag } from '@/features/search-post/model/dateTag.store'
import { usePostRecruitingState } from '@/features/search-post/model/recruitingFilter.store'

import { PostList } from './PostList'

export const BoardMainList = () => {
  const dateTag = usePostDateTag()
  const isRecruiting = usePostRecruitingState()

  const { data, hasNextPage, fetchNextPage } = useFetchPostList({
    urls: {
      title: null,
      place: null,
      trainingDate: dateTag || null,
      recruiting: isRecruiting,
    },
  })

  const postList = data?.pages.flatMap((page) => page.result) || []

  return (
    <PostList
      isRecruiting={isRecruiting}
      postList={postList}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}
