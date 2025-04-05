import { create } from 'zustand'

import type { PostDetailResponse } from '@/entities/board/model/post.type'

type Actions = {
  updatePostDetail: (post: PostDetailResponse) => void
  clearPostDetail: () => void
}

type PostStore = {
  post: PostDetailResponse | null
  actions: Actions
}

export const usePostStore = create<PostStore>((set) => ({
  post: null,
  actions: {
    updatePostDetail: (post: PostDetailResponse) => set({ post: post }),
    clearPostDetail: () => set({ post: null }),
  },
}))

export const usePostDetailContent = () => usePostStore((state) => state.post)
export const usePostDetailContentActions = () => usePostStore((state) => state.actions)
