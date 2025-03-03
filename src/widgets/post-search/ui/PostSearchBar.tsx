import { FilterDropdownStoreProvider } from '@/features/search/model/filterDropdown.store'
import { SearchBar } from '@/features/search/ui/SearchBar'

import { PostSearchKebab } from './PostSearchKebab'

export const PostSearchBar = () => {
  return (
    <FilterDropdownStoreProvider>
      <SearchBar />
      <PostSearchKebab />
    </FilterDropdownStoreProvider>
  )
}
