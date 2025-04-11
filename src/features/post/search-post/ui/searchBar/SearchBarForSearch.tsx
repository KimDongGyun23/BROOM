import {
  useSearchFilterDropDownActions,
  useSearchFilterDropdownState,
  useSearchFilterLabel,
} from '../../model/filterDropdown.store'
import { useSearchFilterName } from '../../model/useSearchFilterName'

import { PostSearchBar } from './PostSearchBar'

export const SearchBarForSearch = () => {
  const isOpen = useSearchFilterDropdownState()

  const currentFilter = useSearchFilterLabel()

  const { setFilterLabel, toggleDropdown } = useSearchFilterDropDownActions()

  useSearchFilterName()

  return (
    <PostSearchBar
      isOpen={isOpen}
      currentFilter={currentFilter}
      setFilterLabel={setFilterLabel}
      toggleDropdown={toggleDropdown}
    />
  )
}
