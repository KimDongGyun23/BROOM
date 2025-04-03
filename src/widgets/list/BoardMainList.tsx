import { useFetchPostList } from '@/entities/board/api/useBoard.query'
import { useDateTag } from '@/features/filter/model/dateTag.store'
import { useIsRecruiting } from '@/features/filter/model/recruiting.store'

import { PostList } from './PostList'

export const BoardMainList = () => {
  const dateTag = useDateTag()
  const isRecruiting = useIsRecruiting()

  const { data, hasNextPage, fetchNextPage } = useFetchPostList({
    urls: {
      title: null,
      place: null,
      trainingDate: dateTag || null,
      recruiting: isRecruiting,
    },
  })

  const postList = data?.pages.flatMap((page) => page.data.result) || []

  return <PostList postList={postList} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
}
