import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

type Actions = {
  toggleFilterActiveOnly: VoidFunction
}

type ActiveOnlyFilterStore = {
  isFilteringActiveOnly: boolean
  actions: Actions
}

const ActiveOnlyFilterStoreContext = createContext<StoreApi<ActiveOnlyFilterStore> | null>(null)

export const ActiveOnlyFilterStoreProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState(() =>
    createStore<ActiveOnlyFilterStore>((set) => ({
      isFilteringActiveOnly: false,
      actions: {
        toggleFilterActiveOnly: () =>
          set((state) => ({
            isFilteringActiveOnly: !state.isFilteringActiveOnly,
          })),
      },
    })),
  )

  return (
    <ActiveOnlyFilterStoreContext.Provider value={store}>
      {children}
    </ActiveOnlyFilterStoreContext.Provider>
  )
}

export const useActiveOnlyFilterStore = <T,>(selector: (state: ActiveOnlyFilterStore) => T): T => {
  const store = useContext(ActiveOnlyFilterStoreContext)
  if (!store) {
    throw new Error('useActiveOnlyFilterStore는 ActiveOnlyFilterStoreProvider 내부에서만 사용 가능')
  }
  return useStore(store, selector)
}

export const useIsFilteringActiveOnly = () =>
  useActiveOnlyFilterStore((state) => state.isFilteringActiveOnly)
export const useActiveOnlyFilterActions = () => useActiveOnlyFilterStore((state) => state.actions)
