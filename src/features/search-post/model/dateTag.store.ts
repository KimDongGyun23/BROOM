import { create } from 'zustand'

import { formatDate } from '@/shared/lib/formatDate'

type DateTagStore = {
  dateTag: string | null
  actions: {
    setDateTag: (date: string | null) => void
    clearDate: VoidFunction
  }
}

const createDateTagStore = () =>
  create<DateTagStore>((set) => ({
    dateTag: null,
    actions: {
      setDateTag: (date) => {
        const formattedDate = date ? formatDate(date, 'default') : null
        set({ dateTag: formattedDate })
      },
      clearDate: () => set({ dateTag: null }),
    },
  }))

const usePostDateTagStore = createDateTagStore()

export const usePostDateTag = () => usePostDateTagStore((state) => state.dateTag)
export const usePostDateTagActions = () => usePostDateTagStore((state) => state.actions)

const useSearchPostDateTagStore = createDateTagStore()

export const useSearchPostDateTag = () => useSearchPostDateTagStore((state) => state.dateTag)
export const useSearchPostDateTagActions = () => useSearchPostDateTagStore((state) => state.actions)
