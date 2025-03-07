import { create } from 'zustand'

import type { PostDetailResponse } from '@/entities/board/model/post.type'

type Actions = {
  updatePostDetail: (post: PostDetailResponse) => void
  clearPostDetail: () => void
}

type PostStore = {
  postDetail: PostDetailResponse | null
  actions: Actions
}

export const usePostStore = create<PostStore>((set) => ({
  postDetail: null,
  actions: {
    updatePostDetail: (post: PostDetailResponse) => set({ postDetail: post }),
    clearPostDetail: () => set({ postDetail: null }),
  },
}))

export const usePostDetail = () => usePostStore((state) => state.postDetail)
export const usePostDetailActions = () => usePostStore((state) => state.actions)
