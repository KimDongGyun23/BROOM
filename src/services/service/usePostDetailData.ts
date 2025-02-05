import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useParamId } from '@/hooks/useParamId'
import { usePostActions } from '@/stores/post'
import type { PostDetailResponse } from '@/types/post'
import { TAB_KEYS } from '@/utils/constants'

const postDetail: PostDetailResponse = {
  author: {
    nickname: '군인왕',
    reserveYear: 3,
    militaryBranch: 'NAVY',
  },
  status: {
    createdAt: '2025-02-03T20:00:00',
    boardId: 'board_1234',
    full: false,
    bookmark: true,
  },
  contentDetail: {
    title: '함께 운동할 동료를 구합니다!',
    trainingDate: '2025-02-10',
    place: '서울 강남',
    time: '14:30',
    personnel: 5,
    content:
      '같이 운동하면서 건강도 지키고 친목도 다질 분을 모집합니다. 열정 넘치는 분들의 참여를 기다립니다!',
  },
}

export const usePostDetailData = () => {
  const boardId = useParamId()
  const { pathname } = useLocation()
  // const { data: postDetail, isPending, isError } = usePostDetail({ urls: { boardId } })
  const { setPost, setTab } = usePostActions()

  useEffect(() => {
    if (postDetail) {
      setPost({ ...postDetail })
      setTab(pathname.startsWith(TAB_KEYS[0]) ? 'carpool' : 'team')
    }
  }, [setPost, setTab, pathname])

  return { postDetail, isPending: false, isError: false }
}
