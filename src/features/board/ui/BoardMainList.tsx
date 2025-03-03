import { useFetchPostList } from '@/features/board/api/useBoard.query'
import { useDateTag } from '@/features/filter/model/dateTag.store'
import { useIsRecruiting } from '@/features/filter/model/recruiting.store'
import { formatDate } from '@/shared/lib/formatDate'

import { PostList } from './PostList'

export const BoardMainList = () => {
  const dateTag = useDateTag()
  const isRecruiting = useIsRecruiting()

  const formattedDate = dateTag
    ? formatDate(`${new Date().getFullYear()}.${dateTag}`, 'default')
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
