import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useSearchFilter } from '@/features/search/hook/useSearchFilter'
import { useSearchOptionList } from '@/features/search/hook/useSearchOptionList'
import { useIsFilterDropdownOpen } from '@/features/search/model/filterDropdown.store'
import { SearchBar } from '@/features/search/ui/SearchBar'
import type { SearchType } from '@/shared/model/common.type'
import { Kebab } from '@/shared/ui/Kebab'

export const PostSearchBar = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const defaultSearchName = searchParams.get('searchName') || ''

  const isDropdownOpen = useIsFilterDropdownOpen()
  const searchOptionList = useSearchOptionList()

  const { currentFilter } = useSearchFilter()

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

  return (
    <FormProvider {...formMethod}>
      <SearchBar onSubmit={handleSubmit(handleSearch)} />
      <Kebab
        isOpen={isDropdownOpen}
        items={searchOptionList}
        position={[120, undefined, undefined, 16]}
      />
    </FormProvider>
  )
}
