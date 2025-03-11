import { useCallback } from 'react'

import type { SearchOption } from '@/entities/board/config/post.constant'
import { SEARCH_OPTIONS } from '@/entities/board/config/post.constant'
import {
  useFilterDropDownActions,
  useIsFilterDropdownOpen,
} from '@/features/search-post/model/filterDropdown.store'
import { Kebab } from '@/shared/ui/Kebab'

export const PostSearchKebab = () => {
  const isDropdownOpen = useIsFilterDropdownOpen()

  const { setFilterLabel, toggleDropdown } = useFilterDropDownActions()

  const selectFilter = useCallback(
    (filter: SearchOption) => {
      setFilterLabel(filter)
      toggleDropdown()
    },
    [setFilterLabel, toggleDropdown],
  )

  const dropdownItems = SEARCH_OPTIONS.map((option) => ({
    ...option,
    onClick: () => selectFilter(option),
  }))

  return (
    <Kebab
      isOpen={isDropdownOpen}
      items={dropdownItems}
      position={[120, undefined, undefined, 16]}
    />
  )
}
