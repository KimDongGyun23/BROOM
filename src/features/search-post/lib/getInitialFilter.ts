import type { SearchOption } from '@/features/search-post/config/searchOptions.constant'
import { SEARCH_OPTIONS } from '@/features/search-post/config/searchOptions.constant'

export const getInitialFilter = (filterLabel: string | null): SearchOption =>
  SEARCH_OPTIONS.find((option) => option.label === filterLabel) || SEARCH_OPTIONS[0]
