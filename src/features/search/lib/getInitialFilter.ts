import type { SearchOption } from '@/entities/board/config/post.constant'
import { SEARCH_OPTIONS } from '@/entities/board/config/post.constant'

export const getInitialFilter = (filterLabel: string | null): SearchOption =>
  SEARCH_OPTIONS.find((option) => option.label === filterLabel) || SEARCH_OPTIONS[0]
