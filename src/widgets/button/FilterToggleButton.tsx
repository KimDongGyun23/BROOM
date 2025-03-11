import { styled } from 'styled-components'

import {
  useFilterDropDownActions,
  useFilterLabel,
  useIsFilterDropdownOpen,
} from '@/features/search-post/model/filterDropdown.store'
import { ArrowBottomIcon, ArrowUpIcon } from '@/shared/ui/icons/NonActiveIcons'

export const FilterToggleButton = () => {
  const currentFilter = useFilterLabel()
  const isDropdownOpen = useIsFilterDropdownOpen()

  const { toggleDropdown } = useFilterDropDownActions()

  return (
    <StyledButton
      type="button"
      onClick={toggleDropdown}
      aria-haspopup="true"
      aria-expanded={isDropdownOpen}
    >
      <span>{currentFilter.label}</span>
      {isDropdownOpen ? <ArrowUpIcon /> : <ArrowBottomIcon />}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  flex-shrink: 0;

  & > span {
    ${({ theme }) => theme.font(800, theme.colors.black[500])};
    flex-shrink: 0;
  }
`
