import { useCallback, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { useSearchForm } from '@/forms/usePostSearchForm'
import { useToggle } from '@/hooks/useToggle'
import type { SearchOption } from '@/utils/constants'
import { SEARCH_OPTIONS } from '@/utils/constants'

import { ArrowBottomIcon, ArrowUpIcon, SearchIcon } from '../../view/icons/NonActiveIcons'
import { Kebab } from '../../view/Kebab'

const useFilterSelection = (toggleFilterDropdownVisibility: VoidFunction) => {
  const [searchParams] = useSearchParams()
  const initialFilterLabel = searchParams.get('filterName') || SEARCH_OPTIONS[0].label

  const [currentFilter, setCurrentFilter] = useState<SearchOption>(
    SEARCH_OPTIONS.find((option) => option.label === initialFilterLabel) || SEARCH_OPTIONS[0],
  )

  const handleFilterSelect = useCallback(
    (filter: SearchOption) => {
      setCurrentFilter(filter)
      toggleFilterDropdownVisibility()
    },
    [toggleFilterDropdownVisibility],
  )

  return { currentFilter, handleFilterSelect }
}

export const SearchBar = () => {
  const [isFilterDropdownVisible, toggleFilterDropdownVisibility] = useToggle(false)
  const { currentFilter, handleFilterSelect } = useFilterSelection(toggleFilterDropdownVisibility)

  const { formMethod, onSubmit } = useSearchForm(currentFilter)
  const { register } = formMethod

  return (
    <FormProvider {...formMethod}>
      <StyledSearchForm onSubmit={onSubmit}>
        <StyledFilterButton
          type="button"
          onClick={toggleFilterDropdownVisibility}
          aria-haspopup="true"
          aria-expanded={isFilterDropdownVisible}
        >
          <span className="filter-label">{currentFilter.label}</span>
          {isFilterDropdownVisible ? <ArrowUpIcon /> : <ArrowBottomIcon />}
        </StyledFilterButton>

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
      </StyledSearchForm>

      <Kebab
        isOpen={isFilterDropdownVisible}
        items={SEARCH_OPTIONS.map((option) => ({
          ...option,
          onClick: () => handleFilterSelect(option),
        }))}
        position={[120, undefined, undefined, 16]}
      />
    </FormProvider>
  )
}

const StyledSearchForm = styled.form`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'sm')};
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding('sm', 'md', 'sm', 'lg')};
  ${({ theme }) => theme.border('input')};
  ${({ theme }) => theme.borderRadius('sm')};
`

const StyledFilterButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  flex-shrink: 0;

  .filter-label {
    ${({ theme }) => theme.font(800, theme.colors.black[500])};
    flex-shrink: 0;
  }
`

const StyledInput = styled.input`
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
  flex: 1;
`

const SearchButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
`
