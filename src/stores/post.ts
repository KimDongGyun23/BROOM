import { create } from 'zustand'

import type { PostDetailResponse } from '@/types/post'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

type Actions = {
  setPostDetail: (post: PostDetailResponse) => void
  clearPostDetail: () => void
}

type PostStore = {
  postDetail: PostDetailResponse | null
  isMyPost: boolean
  actions: Actions
}

export const usePostStore = create<PostStore>((set) => ({
  postDetail: null,
  isMyPost: false,
  actions: {
    setPostDetail: (post: PostDetailResponse) => {
      const isMyPost = post.author.nickname === getSessionStorageItem(SESSION_KEYS.NICKNAME)
      set({ postDetail: post, isMyPost })
    },
    clearPostDetail: () => set({ postDetail: null }),
  },
}))

export const usePostDetail = () => usePostStore((state) => state.postDetail)
export const useIsMyPost = () => usePostStore((state) => state.isMyPost)
export const usePostDetailActions = () => usePostStore((state) => state.actions)
