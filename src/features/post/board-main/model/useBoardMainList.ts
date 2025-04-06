import { useFetchPostList } from '@/entities/board/api/useBoard.query'

import { usePostDateTag } from '../../search-post/model/dateTag.store'
import { usePostRecruitingState } from '../../search-post/model/recruitingFilter.store'

export const useBoardMainList = () => {
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

  return {
    postList,
    isPending,
    hasNextPage,
    fetchNextPage,
  }
}
