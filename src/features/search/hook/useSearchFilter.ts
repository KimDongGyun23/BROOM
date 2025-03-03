import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { SearchOption } from '@/entities/board/config/post.constant'
import { SEARCH_OPTIONS } from '@/entities/board/config/post.constant'

const getInitialFilter = (filterLabel: string | null): SearchOption =>
  SEARCH_OPTIONS.find((option) => option.label === filterLabel) || SEARCH_OPTIONS[0]

export const useSearchFilter = () => {
  const [searchParams] = useSearchParams()
  const initialFilterLabel = searchParams.get('filterName')

  const [currentFilter, setCurrentFilter] = useState<SearchOption>(
    getInitialFilter(initialFilterLabel),
  )

  return { currentFilter, setCurrentFilter }
}
