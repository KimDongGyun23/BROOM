import {
  useSearchFilterDropDownActions,
  useSearchFilterDropdownState,
  useSearchFilterLabel,
} from '../../model/filterDropdown.store'

import { PostSearchBar } from './PostSearchBar'

export const SearchBarForSearch = () => {
  const isOpen = useSearchFilterDropdownState()

  const currentFilter = useSearchFilterLabel()

  const { setFilterLabel, toggleDropdown } = useSearchFilterDropDownActions()

  return (
    <PostSearchBar
      isOpen={isOpen}
      currentFilter={currentFilter}
      setFilterLabel={setFilterLabel}
      toggleDropdown={toggleDropdown}
    />
  )
}
