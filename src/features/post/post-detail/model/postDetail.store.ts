import { create } from 'zustand'

import type { PostDetailResponse } from '@/entities/board/model/post.type'

type Actions = {
  updatePostContent: (post: PostDetailResponse) => void
  clearPostContent: () => void
}

type PostStore = {
  post: PostDetailResponse | null
  actions: Actions
}

export const usePostStore = create<PostStore>((set) => ({
  post: null,
  actions: {
    updatePostContent: (post: PostDetailResponse) => set({ post: post }),
    clearPostContent: () => set({ post: null }),
  },
}))

export const usePostContent = () => usePostStore((state) => state.post)
export const usePostContentActions = () => usePostStore((state) => state.actions)
