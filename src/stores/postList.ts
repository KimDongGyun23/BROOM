import { create } from 'zustand'

import type { PostResponse } from '@/types/post'

type Actions = {
  setPostList: (list: PostResponse['result']) => void
  clearList: () => void
}

type PostListStore = {
  list: PostResponse['result'] | null
  actions: Actions
}

export const usePostListStore = create<PostListStore>((set) => ({
  list: null,
  actions: {
    setPostList: (list) => set({ list }),
    clearList: () => set({ list: null }),
  },
}))

export const usePostList = () => usePostListStore((state) => state.list)
export const usePostListActions = () => usePostListStore((state) => state.actions)
