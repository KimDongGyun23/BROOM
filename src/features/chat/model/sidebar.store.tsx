import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

type Actions = {
  openSidebar: VoidFunction
  closeSidebar: VoidFunction
}

type SidebarStore = {
  isSidebarOpen: boolean
  actions: Actions
}

const initialValues = {
  isSidebarOpen: false,
}

const SidebarStoreContext = createContext<StoreApi<SidebarStore> | null>(null)

export const SidebarStoreProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState(() =>
    createStore<SidebarStore>((set) => ({
      ...initialValues,
      actions: {
        openSidebar: () => set({ isSidebarOpen: true }),
        closeSidebar: () => set({ isSidebarOpen: false }),
      },
    })),
  )

  return <SidebarStoreContext.Provider value={store}>{children}</SidebarStoreContext.Provider>
}

export const useSidebarStore = <T,>(selector: (state: SidebarStore) => T): T => {
  const store = useContext(SidebarStoreContext)
  if (!store) {
    throw new Error('useSidebarStore SidebarStoreProvider 내부에서만 사용 가능')
  }
  return useStore(store, selector)
}

export const useIsSidebarOpen = () => useSidebarStore((state) => state.isSidebarOpen)
export const useSidebarActions = () => useSidebarStore((state) => state.actions)
