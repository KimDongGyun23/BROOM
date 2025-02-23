import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import type { SearchOption } from '@/features/board/config/post.constant'
import type { SearchType } from '@/types/common'

export const useSearchForm = (selectedFilter: SearchOption) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const defaultSearchName = searchParams.get('searchName') || ''

  const formMethod = useForm<SearchType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { search: defaultSearchName },
  })

  const { handleSubmit } = formMethod

  const handleSearch = useCallback(
    (formData: SearchType) => {
      navigate(`/carpool/search?filterName=${selectedFilter.label}&searchName=${formData.search}`)
    },
    [navigate, selectedFilter.label],
  )

  return { formMethod, onSubmit: handleSubmit(handleSearch) }
}
