import type { ButtonHTMLAttributes } from 'react'
import { useCallback, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import type { MilitaryBranchCode, MilitaryBranchName } from '@/utils/constants'
import { MILITARY_BRANCHES } from '@/utils/constants'

import { InputGroupContext } from '.'

export const SortOfArmy = ({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { watch, setValue } = useFormContext()
  const section = useContext(InputGroupContext)
  const selectedSort = watch(section) as MilitaryBranchCode | undefined

  const handleClickButton = useCallback(
    (sort: MilitaryBranchName) => {
      setValue(section, MILITARY_BRANCHES[sort])
    },
    [section, setValue],
  )

  return (
    <ButtonContainer>
      {Object.entries(MILITARY_BRANCHES).map(([sort, value]) => (
        <ArmyButton
          key={sort}
          type="button"
          $isSelected={selectedSort === value}
          onClick={() => handleClickButton(sort as MilitaryBranchName)}
          {...rest}
        >
          {sort}
        </ArmyButton>
      ))}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flexBox('row', undefined, 'space-between', theme.gap.md)};
`

const ArmyButton = styled.button<{ $isSelected: boolean }>`
  flex-grow: 1;
  height: 52px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0 ${({ theme }) => theme.gap.md};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.black[600] : 'white'};
  border: ${({ theme, $isSelected }) =>
    $isSelected ? 'none' : `1px solid ${theme.colors.black[300]}`};
  ${({ theme, $isSelected }) =>
    theme.font(800, $isSelected ? theme.colors.black[100] : theme.colors.black[500])};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
