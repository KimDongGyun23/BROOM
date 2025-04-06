import { useCallback } from 'react'
import { styled } from 'styled-components'

import { ArrowBottomIcon, ArrowUpIcon } from '@/shared/ui/icons/NonActiveIcons'
import { Kebab } from '@/shared/ui/Kebab'

import type { SearchOption } from '../../config/searchOptions.constant'
import { SEARCH_OPTIONS } from '../../config/searchOptions.constant'

type Props = {
  isOpen: boolean
  currentFilter: SearchOption
  setFilterLabel: (filterLabel: SearchOption) => void
  toggleDropdown: VoidFunction
}

export const FilterDropdownButton = ({
  isOpen,
  currentFilter,
  setFilterLabel,
  toggleDropdown,
}: Props) => {
  const handleSelectFilter = useCallback(
    (filter: (typeof SEARCH_OPTIONS)[number]) => {
      setFilterLabel(filter)
      toggleDropdown()
    },
    [setFilterLabel, toggleDropdown],
  )

  return (
    <>
      <ButtonWithLabel
        type="button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{currentFilter.label}</span>
        {isOpen ? <ArrowUpIcon /> : <ArrowBottomIcon />}
      </ButtonWithLabel>

      <Kebab
        isOpen={isOpen}
        items={SEARCH_OPTIONS.map((option) => ({
          ...option,
          onClick: () => handleSelectFilter(option),
        }))}
        position={[120, undefined, undefined, 16]}
      />
    </>
  )
}

const ButtonWithLabel = styled.button`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'xs')};
  flex-shrink: 0;

  & > span {
    ${({ theme }) => theme.font(800, theme.colors.black[500])};
    flex-shrink: 0;
  }
`
