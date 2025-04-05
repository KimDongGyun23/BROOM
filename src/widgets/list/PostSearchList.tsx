import { useSearchParams } from 'react-router-dom'

import { useFetchPostList } from '@/entities/board/api/useBoard.query'
import { SEARCH_OPTIONS } from '@/features/search-post/config/searchOptions.constant'
import { useSearchPostDateTag } from '@/features/search-post/model/dateTag.store'
import { useSearchRecruitingState } from '@/features/search-post/model/recruitingFilter.store'

import { PostList } from './PostList'

export const PostSearchList = () => {
  const [searchParams] = useSearchParams()
  const filterLabel = searchParams.get('filterName') || ''
  const searchKeyword = searchParams.get('searchName') || ''
  const filterKey = SEARCH_OPTIONS.find((option) => option.label === filterLabel)?.key

  const dateTag = useSearchPostDateTag()
  const isRecruiting = useSearchRecruitingState()

  const { data, hasNextPage, fetchNextPage } = useFetchPostList({
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
      isRecruiting={isRecruiting}
      postList={searchPostList}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}
