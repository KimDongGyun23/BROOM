import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

import { formatDate } from '@/shared/lib/formatDate'

type Actions = {
  setDateTag: (date: string | null) => void
}

type DateTagStore = {
  dateTag: string | null
  actions: Actions
}

const DateTagStoreContext = createContext<StoreApi<DateTagStore> | null>(null)

export const DateTagStoreProvider = ({ children }: PropsWithChildren) => {
  const [store] = useState(() =>
    createStore<DateTagStore>((set) => ({
      dateTag: null,
      actions: {
        setDateTag: (date) => {
          const formattedDate = date
            ? formatDate(`${new Date().getFullYear()}.${date}`, 'default')
            : null
          set({ dateTag: formattedDate })
        },
      },
    })),
  )

  return <DateTagStoreContext.Provider value={store}>{children}</DateTagStoreContext.Provider>
}

export const useDateTagStore = <T,>(selector: (state: DateTagStore) => T): T => {
  const store = useContext(DateTagStoreContext)
  if (!store) {
    throw new Error('useDateTagStore DateTagStoreProvider 내부에서만 사용 가능')
  }
  return useStore(store, selector)
}

export const useDateTag = () => useDateTagStore((state) => state.dateTag)
export const useDateTagActions = () => useDateTagStore((state) => state.actions)
