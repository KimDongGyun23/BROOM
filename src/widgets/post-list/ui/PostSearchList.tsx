import { useSearchParams } from 'react-router-dom'

import { SEARCH_OPTIONS } from '@/entities/board/config/post.constant'
import { useFetchPostList } from '@/features/board/api/useBoard.query'
import { useDateTag } from '@/features/filter/model/dateTag.store'
import { useIsRecruiting } from '@/features/filter/model/recruiting.store'
import { PostList } from '@/widgets/post-list/ui/PostList'

export const PostSearchList = () => {
  const [searchParams] = useSearchParams()
  const filterLabel = searchParams.get('filterName') || ''
  const searchKeyword = searchParams.get('searchName') || ''
  const filterKey = SEARCH_OPTIONS.find((option) => option.label === filterLabel)?.key

  const dateTag = useDateTag()
  const isRecruiting = useIsRecruiting()

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchPostList({
    urls: {
      title: filterKey === 'title' ? searchKeyword : null,
      place: filterKey === 'place' ? searchKeyword : null,
      trainingDate: dateTag || null,
      recruiting: isRecruiting,
    },
  })

  const searchPostList = data?.pages.flatMap((page) => page.result) || []

  return (
    <PostList
      postList={searchPostList}
      isPending={isPending}
      isError={isError}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}
