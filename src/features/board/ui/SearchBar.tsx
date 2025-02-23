import { FormProvider } from 'react-hook-form'
import styled from 'styled-components'

import { useSearchForm } from '@/features/board/hook/usePostSearchForm'
import { useToggle } from '@/hooks/useToggle'
import { ArrowBottomIcon, ArrowUpIcon, SearchIcon } from '@/shared/ui/icons/NonActiveIcons'
import { Kebab } from '@/shared/ui/Kebab'

import { useSearchFilter } from '../hook/useSearchFilter'
import { useIsFilterDropdownOpen } from '../model/filterDropdown.store'

const SearchBarContent = () => {
  const [isDropdownOpen, toggleDropdown] = useToggle(false)
  const { currentFilter } = useSearchFilter()

  const { formMethod, onSubmit } = useSearchForm()
  const { register } = formMethod

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

      <FormProvider {...formMethod}>
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
      </FormProvider>
    </Container>
  )
}

export const SearchBar = () => {
  const isDropdownOpen = useIsFilterDropdownOpen()
  const { dropdownItems } = useSearchFilter()

  return (
    <>
      <SearchBarContent />

      <Kebab
        isOpen={isDropdownOpen}
        items={dropdownItems}
        position={[120, undefined, undefined, 16]}
      />
    </>
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
