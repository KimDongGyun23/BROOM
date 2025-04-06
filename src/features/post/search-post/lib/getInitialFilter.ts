import type { SearchOption } from '../config/searchOptions.constant'
import { SEARCH_OPTIONS } from '../config/searchOptions.constant'

export const getInitialFilter = (filterLabel: string | null): SearchOption =>
  SEARCH_OPTIONS.find((option) => option.label === filterLabel) || SEARCH_OPTIONS[0]
