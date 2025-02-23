import { create } from 'zustand'

type Actions = {
  toggleIsBookmarked: VoidFunction
  initializeBookmarkState: (initialState: boolean) => void
}

type BookmarkStore = {
  isBookmarked: boolean
  actions: Actions
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  isBookmarked: false,
  actions: {
    initializeBookmarkState: (initialState) => set({ isBookmarked: initialState }),
    toggleIsBookmarked: () =>
      set((state) => ({
        isBookmarked: !state.isBookmarked,
      })),
  },
}))

export const useIsBookmarked = () => useBookmarkStore((state) => state.isBookmarked)
export const useBookmarkActions = () => useBookmarkStore((state) => state.actions)
