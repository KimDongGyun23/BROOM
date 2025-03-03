import { useCallback } from 'react'

import type { SearchOption } from '@/entities/board/config/post.constant'
import { SEARCH_OPTIONS } from '@/entities/board/config/post.constant'

import { useFilterDropDownActions } from '../model/filterDropdown.store'

import { useSearchFilter } from './useSearchFilter'

export const useSearchOptionList = () => {
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

  return dropdownItems
}
