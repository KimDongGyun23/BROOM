import { useCallback, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { useSearchForm } from '@/hooks/useForm'
import { useToggle } from '@/hooks/useToggle'
import type { SearchType } from '@/types/common'
import type { SearchOption } from '@/utils/constants'
import { SEARCH_OPTIONS } from '@/utils/constants'

import { ArrowBottomIcon, ArrowUpIcon, SearchIcon } from '../../view/icons/NonActiveIcons'
import { Kebab } from '../../view/Kebab'

type SearchBarProps = {
  currentTab: 'carpool' | 'team'
}

export const SearchBar = ({ currentTab }: SearchBarProps) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isFilterVisible, toggleFilterVisibility] = useToggle(false)

  const defaultFilterName = searchParams.get('filterName') || SEARCH_OPTIONS[0].label
  const defaultSearchName = searchParams.get('searchName') || ''

  const [selectedFilter, setSelectedFilter] = useState<SearchOption>(
    SEARCH_OPTIONS.find((option) => option.label === defaultFilterName) || SEARCH_OPTIONS[0],
  )

  const formMethod = useSearchForm({ search: defaultSearchName })
  const { register, handleSubmit } = formMethod

  const handleSearch = useCallback(
    (formData: SearchType) => {
      navigate(
        `/${currentTab}/search?filterName=${selectedFilter.label}&searchName=${formData.search}`,
      )
    },
    [currentTab, selectedFilter.label],
  )

  const handleFilterSelect = useCallback(
    (filter: SearchOption) => {
      setSelectedFilter(filter)
      toggleFilterVisibility()
    },
    [toggleFilterVisibility],
  )

  return (
    <FormProvider {...formMethod}>
      <SearchForm onSubmit={handleSubmit(handleSearch)}>
        <FilterButton
          type="button"
          onClick={toggleFilterVisibility}
          aria-haspopup="true"
          aria-expanded={isFilterVisible}
        >
          <span className="filter-label">{selectedFilter.label}</span>
          {isFilterVisible ? <ArrowUpIcon /> : <ArrowBottomIcon />}
        </FilterButton>

        <SearchInput
          type="search"
          size={7}
          {...register('search')}
          placeholder={selectedFilter.placeholder}
          aria-label={`${selectedFilter.label} 검색`}
        />

        <SearchButton type="submit" aria-label="검색">
          <SearchIcon />
        </SearchButton>
      </SearchForm>

      {isFilterVisible && (
        <Kebab
          items={SEARCH_OPTIONS.map((option) => ({
            ...option,
            onClick: () => handleFilterSelect(option),
          }))}
          position={[125, 0, 0, 16]}
        />
      )}
    </FormProvider>
  )
}

const SearchForm = styled.form`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding('sm', 'md', 'sm', 'lg')};
  ${({ theme }) => theme.border('input')};
  ${({ theme }) => theme.borderRadius('sm')};
`

const FilterButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  flex-shrink: 0;

  .filter-label {
    ${({ theme }) => theme.font(800, theme.colors.black[500])};
    flex-shrink: 0;
  }
`

const SearchInput = styled.input`
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
  flex: 1;
`

const SearchButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
`
