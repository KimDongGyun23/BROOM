import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import type { SearchType } from '@/shared/model/common.type'
import { ArrowBottomIcon, ArrowUpIcon, SearchIcon } from '@/shared/ui/icons/NonActiveIcons'

import { useSearchFilter } from '../hook/useSearchFilter'
import { useFilterDropDownActions, useIsFilterDropdownOpen } from '../model/filterDropdown.store'

type SearchBarProps = {
  onSubmit: VoidFunction
}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const isDropdownOpen = useIsFilterDropdownOpen()
  const { toggleDropdown } = useFilterDropDownActions()

  const { currentFilter } = useSearchFilter()

  const { register } = useFormContext<SearchType>()

  return (
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

      <FormContainer onSubmit={onSubmit}>
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
