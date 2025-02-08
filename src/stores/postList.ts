import { create } from 'zustand'

import type { PostResponse } from '@/types/post'
import type { TabKey } from '@/utils/constants'

type Actions = {
  setPost: (list: PostResponse['result']) => void
  setTab: (newTab: TabKey) => void
  clearList: () => void
}

type PostListStore = {
  currentTab: TabKey | null
  list: PostResponse['result'] | null
  hasNext: boolean
  actions: Actions
}

export const usePostListStore = create<PostListStore>((set) => ({
  currentTab: null,
  list: null,
  hasNext: false,
  actions: {
    setPost: (list) => set({ list }),
    setTab: (newTab) => set({ currentTab: newTab }),
    clearList: () => set({ list: null }),
  },
}))

export const usePostList = () => usePostListStore((state) => state.list)
export const usePostListCurrentTab = () => usePostListStore((state) => state.currentTab)
export const usePostListActions = () => usePostListStore((state) => state.actions)
