import { create } from 'zustand'

import type { PostDetailResponse } from '@/types/post'
import type { TabKey } from '@/utils/constants'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

type Actions = {
  setPost: (post: PostDetailResponse) => void
  setTab: (newTab: TabKey) => void
  clearPost: () => void
}

type PostStore = {
  currentTab: TabKey | null
  post: PostDetailResponse | null
  isMyPost: boolean
  actions: Actions
}

export const usePostStore = create<PostStore>((set) => ({
  currentTab: null,
  post: null,
  isMyPost: false,
  actions: {
    setPost: (post: PostDetailResponse) => {
      const isMyPost = post.author.nickname === getSessionStorageItem(SESSION_KEYS.NICKNAME)
      set({ post, isMyPost })
    },
    setTab: (newTab: TabKey) => set({ currentTab: newTab }),
    clearPost: () => set({ post: null }),
  },
}))

export const usePost = () => usePostStore((state) => state.post)
export const useCurrentTab = () => usePostStore((state) => state.currentTab)
export const useIsMyPost = () => usePostStore((state) => state.isMyPost)
export const usePostActions = () => usePostStore((state) => state.actions)
