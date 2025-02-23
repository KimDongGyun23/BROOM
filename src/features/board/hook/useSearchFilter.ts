import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { SEARCH_OPTIONS, type SearchOption } from '../config/post.constant'
import { useFilterDropDownActions } from '../model/filterDropdown.store'

const getInitialFilter = (filterLabel: string | null): SearchOption =>
  SEARCH_OPTIONS.find((option) => option.label === filterLabel) || SEARCH_OPTIONS[0]

export const useSearchFilter = () => {
  const [searchParams] = useSearchParams()
  const initialFilterLabel = searchParams.get('filterName')

  const [currentFilter, setCurrentFilter] = useState<SearchOption>(
    getInitialFilter(initialFilterLabel),
  )

  const { toggleDropdown } = useFilterDropDownActions()

  const selectFilter = useCallback(
    (filter: SearchOption) => {
      setCurrentFilter(filter)
      toggleDropdown()
    },
    [toggleDropdown],
  )

  const dropdownItems = SEARCH_OPTIONS.map((option) => ({
    ...option,
    onClick: () => selectFilter(option),
  }))

  return { currentFilter, dropdownItems }
}
