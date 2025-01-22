import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

import type { TabLabel } from '@/utils/constants'

type Actions = {
  setActiveTab: (tab: TabLabel) => void
}

type PostTabStore = {
  activeTab: TabLabel
  actions: Actions
}

type PostTabProvider = {
  children: ReactNode
  initialTab?: TabLabel
}

const PostTabStoreContext = createContext<StoreApi<PostTabStore> | null>(null)

export const PostTabStoreProvider = ({ children, initialTab = '승차 공유' }: PostTabProvider) => {
  const [store] = useState(() =>
    createStore<PostTabStore>((set) => ({
      activeTab: initialTab,
      actions: {
        setActiveTab: (tab) => set({ activeTab: tab }),
      },
    })),
  )

  return <PostTabStoreContext.Provider value={store}>{children}</PostTabStoreContext.Provider>
}

export const usePostTabStore = <T,>(selector: (state: PostTabStore) => T): T => {
  const store = useContext(PostTabStoreContext)
  if (!store) {
    throw new Error('PostTabStoreProvider 찾을 수 없음')
  }
  return useStore(store, selector)
}

export const useActiveTab = () => usePostTabStore((state) => state.activeTab)
export const usePostTabActions = () => usePostTabStore((state) => state.actions)
