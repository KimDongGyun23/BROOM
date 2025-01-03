import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useSearchForm, useToggle } from '@/hooks'
import { SEARCH_OPTIONS } from '@/utils'

import { ArrowBottomIcon, SearchIcon } from './icons/NonActiveIcons'
import { Kebab } from './Kebab'

type SearchBarProps = {
  currentTab: 'carpool' | 'teammate'
}

export const SearchBar = ({ currentTab }: SearchBarProps) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const defaultFilterName = searchParams.get('filterName')
  const defaultSearchName = searchParams.get('searchName')

  const formMethod = useSearchForm({ search: defaultSearchName || '' })
  const { register, handleSubmit } = formMethod

  const [isFilterVisible, toggleFilterVisibility] = useToggle(false)
  const [filterName, setFilterName] = useState(defaultFilterName || SEARCH_OPTIONS[0].label)

  const handleSearch = (formData: { search: string }) =>
    navigate(`/${currentTab}/search?filterName=${filterName}&searchName=${formData.search}`)

  const searchOptions = SEARCH_OPTIONS.map((filter) => ({
    ...filter,
    onClick: () => setFilterName(filter.label),
  }))

  const placeholder = SEARCH_OPTIONS.find((filter) => filter.label === filterName)?.placeholder

  return (
    <FormProvider {...formMethod}>
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="p-medium flex-align mx-4 mt-2 gap-2 rounded-lg border border-grey-2 py-[10px] pl-4 pr-[10px] font-regular"
      >
        <button
          type="button"
          className="flex-align shrink-0 gap-1"
          onClick={toggleFilterVisibility}
        >
          <p className="p-small shrink-0 text-grey-6">{filterName}</p>
          <ArrowBottomIcon />
        </button>

        <input
          type="text"
          size={7}
          {...register('search')}
          className="focus: flex-1 text-grey-7 outline-none placeholder:text-grey-4"
          placeholder={placeholder}
        />

        <button type="submit">
          <SearchIcon />
        </button>
      </form>

      {isFilterVisible && <Kebab list={searchOptions} location="left-4 top-[125px]" />}
    </FormProvider>
  )
}
