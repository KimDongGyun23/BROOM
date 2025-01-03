import { create } from 'zustand'

import type { FilterNameType } from '@/types'
import type { PostItemType } from '@/types/post'

type Actions = {
  updateSearchList: (newList: PostItemType[]) => void
  changeFilterName: (newFilter: FilterNameType) => void
  toggleFilterVisibility: VoidFunction
}

type SearchListStore = {
  searchList: PostItemType[]
  filterName: FilterNameType
  isFilterVisible: boolean
  actions: Actions
}

const useSearchListStore = create<SearchListStore>((set) => ({
  searchList: [],
  filterName: '제목',
  isFilterVisible: false,
  actions: {
    updateSearchList: (newList) => set(() => ({ searchList: [...newList] })),
    changeFilterName: (newFilter) => set(() => ({ filterName: newFilter })),
    toggleFilterVisibility: () => set((prev) => ({ isFilterVisible: !prev })),
  },
}))

export const useSearchList = () => useSearchListStore((state) => state.searchList)
export const useFilterName = () => useSearchListStore((state) => state.filterName)
export const useFilterVisible = () => useSearchListStore((state) => state.isFilterVisible)
export const useSearchListActions = () => useSearchListStore((state) => state.actions)
