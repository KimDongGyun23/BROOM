import {
  useFilterDropDownActions,
  useFilterDropdownState,
  useFilterLabel,
} from '../../model/filterDropdown.store'

import { PostSearchBar } from './PostSearchBar'

export const SearchBarForPost = () => {
  const isOpen = useFilterDropdownState()

  const currentFilter = useFilterLabel()

  const { setFilterLabel, toggleDropdown } = useFilterDropDownActions()

  return (
    <PostSearchBar
      isOpen={isOpen}
      currentFilter={currentFilter}
      setFilterLabel={setFilterLabel}
      toggleDropdown={toggleDropdown}
    />
  )
}
