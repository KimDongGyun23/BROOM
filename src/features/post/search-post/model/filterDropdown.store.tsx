import { create } from 'zustand'

import { SEARCH_OPTIONS, type SearchOption } from '../config/searchOptions.constant'

type FilterDropdownStore = {
  isDropdownOpen: boolean
  filterLabel: SearchOption
  actions: {
    toggleDropdown: VoidFunction
    setFilterLabel: (filterLabel: SearchOption) => void
  }
}

const createFilterDropdownStore = () =>
  create<FilterDropdownStore>((set) => ({
    isDropdownOpen: false,
    filterLabel: SEARCH_OPTIONS[0],
    actions: {
      toggleDropdown: () =>
        set((state) => ({
          isDropdownOpen: !state.isDropdownOpen,
        })),
      setFilterLabel: (filterLabel) => {
        set({ filterLabel })
      },
    },
  }))

const useFilterDropdownStore = createFilterDropdownStore()

export const useFilterDropdownState = () => useFilterDropdownStore((state) => state.isDropdownOpen)
export const useFilterLabel = () => useFilterDropdownStore((state) => state.filterLabel)
export const useFilterDropDownActions = () => useFilterDropdownStore((state) => state.actions)

const useSearchFilterDropdownStore = createFilterDropdownStore()

export const useSearchFilterDropdownState = () =>
  useSearchFilterDropdownStore((state) => state.isDropdownOpen)
export const useSearchFilterLabel = () => useSearchFilterDropdownStore((state) => state.filterLabel)
export const useSearchFilterDropDownActions = () =>
  useSearchFilterDropdownStore((state) => state.actions)
