import { useCallback, useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import type { MilitaryBranchCode, MilitaryBranchName } from '@/utils/constants'
import { MILITARY_BRANCHES } from '@/utils/constants'

import { InputGroupContext } from '.'

type SortOfArmyProps = {
  disabled?: boolean
}

export const SortOfArmy = ({ disabled = false }: SortOfArmyProps) => {
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
    <div className="flex-between gap-2">
      {Object.entries(MILITARY_BRANCHES).map(([sort, value]) => {
        const isSelected = selectedSort === value
        const buttonStyle = isSelected
          ? 'bg-black-600 border-none text-black-100'
          : 'bg-white border-black-300 text-black-500'
        return (
          <button
            key={sort}
            type="button"
            disabled={disabled}
            className={`p-800 h-[52px] grow rounded-xl border px-3 ${buttonStyle}`}
            onClick={() => handleClickButton(sort as MilitaryBranchName)}
          >
            {sort}
          </button>
        )
      })}
    </div>
  )
}
