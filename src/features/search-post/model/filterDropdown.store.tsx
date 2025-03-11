import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

import type { SearchOption } from '@/entities/board/config/post.constant'

import { getInitialFilter } from '../lib/getInitialFilter'

type Actions = {
  toggleDropdown: VoidFunction
  setFilterLabel: (filterLabel: SearchOption) => void
}

type FilterDropdownStore = {
  isDropdownOpen: boolean
  filterLabel: SearchOption
  actions: Actions
}

const FilterDropdownStoreContext = createContext<StoreApi<FilterDropdownStore> | null>(null)

export const FilterDropdownStoreProvider = ({ children }: PropsWithChildren) => {
  const [searchParams] = useSearchParams()
  const initialFilterLabel = searchParams.get('filterName')

  const [store] = useState(() =>
    createStore<FilterDropdownStore>((set) => ({
      isDropdownOpen: false,
      filterLabel: getInitialFilter(initialFilterLabel),
      actions: {
        toggleDropdown: () =>
          set((state) => ({
            isDropdownOpen: !state.isDropdownOpen,
          })),
        setFilterLabel: (filterLabel) => {
          set({ filterLabel })
        },
      },
    })),
  )

  return (
    <FilterDropdownStoreContext.Provider value={store}>
      {children}
    </FilterDropdownStoreContext.Provider>
  )
}

export const useFilterDropdownStore = <T,>(selector: (state: FilterDropdownStore) => T): T => {
  const store = useContext(FilterDropdownStoreContext)
  if (!store) {
    throw new Error('useFilterDropdownStore는 FilterDropdownStoreProvider 내부에서만 사용 가능')
  }
  return useStore(store, selector)
}

export const useIsFilterDropdownOpen = () => useFilterDropdownStore((state) => state.isDropdownOpen)
export const useFilterLabel = () => useFilterDropdownStore((state) => state.filterLabel)
export const useFilterDropDownActions = () => useFilterDropdownStore((state) => state.actions)
