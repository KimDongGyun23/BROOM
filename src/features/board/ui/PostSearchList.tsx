import { useSearchParams } from 'react-router-dom'

import { SEARCH_OPTIONS } from '@/features/board/config/post.constant'
import { useIsRecruiting } from '@/features/filter/model/recruiting.store'
import { PostList } from '@/features/board/ui/PostList'
import { formatDate } from '@/shared/lib/formatDate'

import { useFetchPostList } from '../api/useBoard.query'
import { useDateTag } from '../../filter/model/dateTag.store'

export const PostSearchList = () => {
  const [searchParams] = useSearchParams()
  const filterLabel = searchParams.get('filterName') || ''
  const searchKeyword = searchParams.get('searchName') || ''
  const filterKey = SEARCH_OPTIONS.find((option) => option.label === filterLabel)?.key

  const dateTag = useDateTag()
  const isRecruiting = useIsRecruiting()

  const formattedDate = dateTag
    ? formatDate(`${new Date().getFullYear()}.${dateTag}`, 'default')
    : null

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchPostList({
    urls: {
      title: filterKey === 'title' ? searchKeyword : null,
      place: filterKey === 'place' ? searchKeyword : null,
      trainingDate: formattedDate || null,
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
