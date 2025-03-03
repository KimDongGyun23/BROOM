import { useFetchPostList } from '@/features/board/api/useBoard.query'
import { useDateTag } from '@/features/filter/model/dateTag.store'
import { useIsRecruiting } from '@/features/filter/model/recruiting.store'
import { PostList } from '@/widgets/post-list/ui/PostList'

export const BoardMainList = () => {
  const dateTag = useDateTag()
  const isRecruiting = useIsRecruiting()

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchPostList({
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
      postList={postList}
      isPending={isPending}
      isError={isError}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}
