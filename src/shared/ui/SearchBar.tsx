import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import type { SearchOption } from '@/entities/board/config/post.constant'
import { SearchIcon } from '@/shared/ui/icons/NonActiveIcons'

type SearchBarProps = {
  currentFilter: SearchOption
  onSubmit: VoidFunction
}

export const SearchBar = ({ currentFilter, onSubmit }: SearchBarProps) => {
  const { register } = useFormContext()

  return (
    <StyledForm onSubmit={onSubmit}>
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
    </StyledForm>
  )
}

const StyledForm = styled.form`
  ${({ theme }) => theme.flexBox('row', 'center')};
  flex: 1;
`

const StyledInput = styled.input`
  ${({ theme }) => theme.padding(0, 'sm')};
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
  width: 100%;
`

const SearchButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', 'center')};
`
