import { create } from 'zustand'

import type { PostDetailResponse } from '@/types/post'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

type Actions = {
  setPost: (post: PostDetailResponse) => void
  clearPost: () => void
}

type PostStore = {
  post: PostDetailResponse | null
  isMyPost: boolean | null
  actions: Actions
}

export const usePostStore = create<PostStore>((set) => ({
  post: null,
  isMyPost: null,
  actions: {
    setPost: (post: PostDetailResponse) => {
      const isMyPost = post.WriterNickname === getSessionStorageItem(SESSION_KEYS.NICKNAME)
      set({ post, isMyPost })
    },
    clearPost: () => set({ post: null }),
  },
}))

export const usePost = () => usePostStore((state) => state.post)
export const useIsMyPost = () => usePostStore((state) => state.isMyPost)
export const usePostActions = () => usePostStore((state) => state.actions)
