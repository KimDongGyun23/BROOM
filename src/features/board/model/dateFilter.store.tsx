import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

type Actions = {
  setDateFilter: (date: string | null) => void
}

type DateFilterStore = {
  dateFilter: string | null
  actions: Actions
}

const DateFilterStoreContext = createContext<StoreApi<DateFilterStore> | null>(null)

export const DateFilterStoreProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState(() =>
    createStore<DateFilterStore>((set) => ({
      dateFilter: null,
      actions: {
        setDateFilter: (date) => set({ dateFilter: date }),
      },
    })),
  )

  return <DateFilterStoreContext.Provider value={store}>{children}</DateFilterStoreContext.Provider>
}

export const useDateFilterStore = <T,>(selector: (state: DateFilterStore) => T): T => {
  const store = useContext(DateFilterStoreContext)
  if (!store) {
    throw new Error('useDateFilterStore DateFilterStoreProvider 내부에서만 사용 가능')
  }
  return useStore(store, selector)
}

export const useDateFilter = () => useDateFilterStore((state) => state.dateFilter)
export const useDateFilterActions = () => useDateFilterStore((state) => state.actions)
