import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { SearchType } from '@/types/common'
import type { SearchOption } from '@/utils/constants'
import { TAB_KEYS } from '@/utils/constants'

export const useSearchForm = (selectedFilter: SearchOption) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const defaultSearchName = searchParams.get('searchName') || ''

  const currentTab = useMemo(
    () => (pathname.includes(TAB_KEYS[0]) ? TAB_KEYS[0] : TAB_KEYS[1]),
    [pathname],
  )

  const formMethod = useForm<SearchType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { search: defaultSearchName },
  })

  const { handleSubmit } = formMethod

  const handleSearch = useCallback(
    (formData: SearchType) => {
      navigate(
        `/${currentTab}/search?filterName=${selectedFilter.label}&searchName=${formData.search}`,
      )
    },
    [currentTab, navigate, selectedFilter.label],
  )

  return { formMethod, onSubmit: handleSubmit(handleSearch) }
}
