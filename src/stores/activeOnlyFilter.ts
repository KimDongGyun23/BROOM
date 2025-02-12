import { create } from 'zustand'

type Actions = {
  toggleFilterActiveOnly: VoidFunction
}

type ActiveOnlyFilterStore = {
  isFilteringActiveOnly: boolean
  actions: Actions
}

export const useActiveOnlyFilterStore = create<ActiveOnlyFilterStore>((set) => ({
  isFilteringActiveOnly: false,
  actions: {
    toggleFilterActiveOnly: () =>
      set((state) => ({
        isFilteringActiveOnly: !state.isFilteringActiveOnly,
      })),
  },
}))

export const useIsFilteringActiveOnly = () =>
  useActiveOnlyFilterStore((state) => state.isFilteringActiveOnly)
export const useActiveOnlyFilterActions = () => useActiveOnlyFilterStore((state) => state.actions)
