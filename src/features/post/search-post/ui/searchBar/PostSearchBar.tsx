import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { styled } from 'styled-components'

import { SearchBar } from '@/features/post/search-post/ui/searchBar/SearchBar'
import type { Search } from '@/shared/model/common.type'

import type { SearchOption } from '../../config/searchOptions.constant'

import { FilterDropdownButton } from './FilterDropdownButton'

type Props = {
  isOpen: boolean
  currentFilter: SearchOption
  setFilterLabel: (filterLabel: SearchOption) => void
  toggleDropdown: VoidFunction
}

export const PostSearchBar = ({ isOpen, currentFilter, setFilterLabel, toggleDropdown }: Props) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const defaultSearchName = searchParams.get('searchName') || ''

  const formMethod = useForm<Search>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { search: defaultSearchName },
  })

  const { handleSubmit } = formMethod

  const handleSearchPost = useCallback(
    ({ search }: Search) => {
      navigate(`/board/search?filterName=${currentFilter.label}&searchName=${search}`)
    },
    [navigate, currentFilter],
  )

  return (
    <FormProvider {...formMethod}>
      <Container>
        <FilterDropdownButton
          isOpen={isOpen}
          currentFilter={currentFilter}
          setFilterLabel={setFilterLabel}
          toggleDropdown={toggleDropdown}
        />
        <SearchBar currentFilter={currentFilter} onSubmit={handleSubmit(handleSearchPost)} />
      </Container>
    </FormProvider>
  )
}

const Container = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center')};
    ${theme.margin(0, 'container')};
    ${theme.padding('sm', 'md', 'sm', 'lg')};
    ${theme.border('input')};
    ${theme.borderRadius('sm')};
  `}
`
