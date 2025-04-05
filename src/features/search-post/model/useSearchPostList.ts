import { useSearchParams } from 'react-router-dom'

import { useFetchPostList } from '@/entities/board/api/useBoard.query'

import { SEARCH_OPTIONS } from '../config/searchOptions.constant'

import { useSearchPostDateTag } from './dateTag.store'
import { useSearchRecruitingState } from './recruitingFilter.store'

export const useSearchPostList = () => {
  const [searchParams] = useSearchParams()
  const filterLabel = searchParams.get('filterName') || ''
  const searchKeyword = searchParams.get('searchName') || ''
  const filterKey = SEARCH_OPTIONS.find((option) => option.label === filterLabel)?.key

  const dateTag = useSearchPostDateTag()
  const isRecruiting = useSearchRecruitingState()

  const { data, isPending, hasNextPage, fetchNextPage } = useFetchPostList({
    urls: {
      title: filterKey === 'title' ? searchKeyword : null,
      place: filterKey === 'place' ? searchKeyword : null,
      trainingDate: dateTag || null,
      recruiting: isRecruiting,
    },
  })

  const searchPostList = data?.pages.flatMap((page) => page.result) || []

  return {
    searchPostList,
    isPending,
    hasNextPage,
    fetchNextPage,
  }
}
