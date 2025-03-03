import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import type { SearchType } from '@/shared/model/common.type'
import { ArrowBottomIcon, ArrowUpIcon, SearchIcon } from '@/shared/ui/icons/NonActiveIcons'

import {
  useFilterDropDownActions,
  useFilterLabel,
  useIsFilterDropdownOpen,
} from '../model/filterDropdown.store'

export const SearchBar = () => {
  const navigate = useNavigate()
  const isDropdownOpen = useIsFilterDropdownOpen()
  const { toggleDropdown } = useFilterDropDownActions()

  const [searchParams] = useSearchParams()
  const defaultSearchName = searchParams.get('searchName') || ''

  const currentFilter = useFilterLabel()

  const formMethod = useForm<SearchType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { search: defaultSearchName },
  })

  const { handleSubmit, register } = formMethod

  const handleSearch = useCallback(
    ({ search }: SearchType) => {
      navigate(`/board/search?filterName=${currentFilter.label}&searchName=${search}`)
    },
    [navigate, currentFilter],
  )

  return (
    <FormProvider {...formMethod}>
      <Container>
        <FilterButton
          type="button"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <span>{currentFilter.label}</span>
          {isDropdownOpen ? <ArrowUpIcon /> : <ArrowBottomIcon />}
        </FilterButton>

        <FormContainer onSubmit={handleSubmit(handleSearch)}>
          <StyledInput
            type="search"
            size={7}
            {...register('search')}
            placeholder={currentFilter.placeholder}
            aria-label={`${currentFilter.label} 검색`}
          />

          <SearchButton type="submit" aria-label="검색">
            <SearchIcon />
          </SearchButton>
        </FormContainer>
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

const FormContainer = styled.form`
  ${({ theme }) => theme.flexBox('row', 'center')};
  flex: 1;
`

const FilterButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  flex-shrink: 0;

  & > span {
    ${({ theme }) => theme.font(800, theme.colors.black[500])};
    flex-shrink: 0;
  }
`

const StyledInput = styled.input`
  ${({ theme }) => theme.padding(0, 'sm')};
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
  width: 100%;
`

const SearchButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
`
