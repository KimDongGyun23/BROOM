import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { SearchOption } from '../config/searchOptions.constant'
import { SEARCH_OPTIONS } from '../config/searchOptions.constant'

import { useSearchFilterDropDownActions } from './filterDropdown.store'

export const useSearchFilterName = () => {
  const [filterName] = useSearchParams()

  const { setFilterLabel } = useSearchFilterDropDownActions()

  const defaultFilterName = filterName.get('filterName') || ''

  useEffect(() => {
    setFilterLabel(
      SEARCH_OPTIONS.find((option) => option.label === defaultFilterName) as SearchOption,
    )
  }, [defaultFilterName, setFilterLabel])
}
