import { create } from 'zustand'

type Actions = {
  toggleDropdown: VoidFunction
}

type FilterDropdownStore = {
  isDropdownOpen: boolean
  actions: Actions
}

export const useFilterDropdownStore = create<FilterDropdownStore>((set) => ({
  isDropdownOpen: false,
  actions: {
    toggleDropdown: () =>
      set((state) => ({
        isDropdownOpen: !state.isDropdownOpen,
      })),
  },
}))

export const useIsFilterDropdownOpen = () => useFilterDropdownStore((state) => state.isDropdownOpen)
export const useFilterDropDownActions = () => useFilterDropdownStore((state) => state.actions)
