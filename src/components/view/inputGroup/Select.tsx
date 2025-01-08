import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import type { MilitaryBranchCode, MilitaryBranchName } from '@/utils'
import { MILITARY_BRANCHES } from '@/utils'

type SortOfArmyProps = {
  section: string
  disabled?: boolean
}

export const SortOfArmy = ({ section, disabled = false }: SortOfArmyProps) => {
  const { watch, setValue } = useFormContext()
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
          ? 'bg-blue-500 border-none text-grey-100'
          : 'bg-white border-blue-300 text-grey-700'
        return (
          <button
            key={sort}
            type="button"
            disabled={disabled}
            className={`p-medium h-[52px] grow rounded-xl border px-3 ${buttonStyle}`}
            onClick={() => handleClickButton(sort as MilitaryBranchName)}
          >
            {sort}
          </button>
        )
      })}
    </div>
  )
}
