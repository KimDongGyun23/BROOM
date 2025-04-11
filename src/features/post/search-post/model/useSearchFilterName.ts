import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { SearchOption } from '../config/searchOptions.constant'

import { useSearchFilterDropDownActions } from './filterDropdown.store'

export const useSearchFilterName = () => {
  const [filterName] = useSearchParams()

  const { setFilterLabel } = useSearchFilterDropDownActions()

  const defaultFilterName = filterName.get('filterName') || ''

  useEffect(() => {
    setFilterLabel(defaultFilterName as unknown as SearchOption)
  }, [defaultFilterName, setFilterLabel])
}
