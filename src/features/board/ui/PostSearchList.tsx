import { useSearchParams } from 'react-router-dom'

import { SEARCH_OPTIONS } from '@/features/board/config/post.constant'
import { PostList } from '@/features/board/ui/PostList'
import { useDateTag } from '@/features/filter/model/dateTag.store'
import { useIsRecruiting } from '@/features/filter/model/recruiting.store'

import { useFetchPostList } from '../api/useBoard.query'

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
