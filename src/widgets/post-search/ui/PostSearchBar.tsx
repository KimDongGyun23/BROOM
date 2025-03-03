import { useCallback } from 'react'

import type { SearchOption } from '@/entities/board/config/post.constant'
import { SEARCH_OPTIONS } from '@/entities/board/config/post.constant'
import { useSearchFilter } from '@/features/search/hook/useSearchFilter'
import {
  useFilterDropDownActions,
  useIsFilterDropdownOpen,
} from '@/features/search/model/filterDropdown.store'
import { SearchBar } from '@/features/search/ui/SearchBar'
import { Kebab } from '@/shared/ui/Kebab'

export const PostSearchBar = () => {
  const isDropdownOpen = useIsFilterDropdownOpen()
  const { setCurrentFilter } = useSearchFilter()
  const { toggleDropdown } = useFilterDropDownActions()

  const selectFilter = useCallback(
    (filter: SearchOption) => {
      setCurrentFilter(filter)
      toggleDropdown()
    },
    [setCurrentFilter, toggleDropdown],
  )

  const dropdownItems = SEARCH_OPTIONS.map((option) => ({
    ...option,
    onClick: () => selectFilter(option),
  }))

  return (
    <>
      <SearchBar />
      <Kebab
        isOpen={isDropdownOpen}
        items={dropdownItems}
        position={[120, undefined, undefined, 16]}
      />
    </>
  )
}
