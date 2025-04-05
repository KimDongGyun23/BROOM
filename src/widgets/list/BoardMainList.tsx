import { useFetchPostList } from '@/entities/board/api/useBoard.query'
import { PostList } from '@/entities/board/ui/PostList'
import { usePostDateTag } from '@/features/search-post/model/dateTag.store'
import { usePostRecruitingState } from '@/features/search-post/model/recruitingFilter.store'

export const BoardMainList = () => {
  const dateTag = usePostDateTag()
  const isRecruiting = usePostRecruitingState()

  const { data, isPending, hasNextPage, fetchNextPage } = useFetchPostList({
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
      isPending={isPending}
      isRecruiting={isRecruiting}
      postList={postList}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}
