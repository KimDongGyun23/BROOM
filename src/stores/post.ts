import { create } from 'zustand'

import type { CarpoolDetailResponse } from '@/features/board/model/post.type'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

type Actions = {
  updatePostDetail: (post: CarpoolDetailResponse) => void
  clearPostDetail: () => void
}

type PostStore = {
  postDetail: CarpoolDetailResponse | null
  isMyPost: boolean
  actions: Actions
}

export const usePostStore = create<PostStore>((set) => ({
  postDetail: null,
  isMyPost: false,
  actions: {
    updatePostDetail: (post: CarpoolDetailResponse) => {
      const isMyPost = post.author.nickname === getSessionStorageItem(SESSION_KEYS.NICKNAME)
      set({ postDetail: post, isMyPost })
    },
    clearPostDetail: () => set({ postDetail: null }),
  },
}))

export const usePostDetail = () => usePostStore((state) => state.postDetail)
export const useIsMyPost = () => usePostStore((state) => state.isMyPost)
export const usePostDetailActions = () => usePostStore((state) => state.actions)
