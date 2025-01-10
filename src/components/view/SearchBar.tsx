import { useCallback, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useSearchForm, useToggle } from '@/hooks'
import type { SearchType } from '@/types/common'
import type { SearchOption } from '@/utils/constants'
import { SEARCH_OPTIONS } from '@/utils/constants'

import { ArrowBottomIcon, ArrowUpIcon, SearchIcon } from './icons/NonActiveIcons'
import { Kebab } from './Kebab'

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
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="flex-align mx-4 gap-2 rounded-lg border border-black-200 py-[10px] pl-4 pr-[10px]"
      >
        <button
          type="button"
          className="flex-align shrink-0 gap-1"
          onClick={toggleFilterVisibility}
          aria-haspopup="true"
          aria-expanded={isFilterVisible}
        >
          <span className="p-800 shrink-0 text-black-500">{selectedFilter.label}</span>
          {isFilterVisible ? <ArrowUpIcon /> : <ArrowBottomIcon />}
        </button>

        <input
          type="search"
          size={7}
          {...register('search')}
          className="p-800 flex-1 grow text-black-500 placeholder:text-black-300 focus:outline-none"
          placeholder={selectedFilter.placeholder}
          aria-label={`${selectedFilter.label} 검색`}
        />

        <button type="submit" aria-label="검색">
          <SearchIcon />
        </button>
      </form>

      {isFilterVisible && (
        <Kebab
          items={SEARCH_OPTIONS.map((option) => ({
            ...option,
            onClick: () => handleFilterSelect(option),
          }))}
          position="left-4 top-[125px]"
        />
      )}
    </FormProvider>
  )
}
