import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useSearchFilter } from '@/features/search/hook/useSearchFilter'
import type { SearchType } from '@/shared/model/common.type'

export const useSearchForm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { currentFilter } = useSearchFilter()
  const defaultSearchName = searchParams.get('searchName') || ''

  const formMethod = useForm<SearchType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { search: defaultSearchName },
  })

  const { handleSubmit } = formMethod

  const handleSearch = useCallback(
    ({ search }: SearchType) => {
      navigate(`/carpool/search?filterName=${currentFilter.label}&searchName=${search}`)
    },
    [navigate, currentFilter.label],
  )

  return { formMethod, onSubmit: handleSubmit(handleSearch) }
}
