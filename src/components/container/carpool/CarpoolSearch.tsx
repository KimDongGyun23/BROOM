import { FormProvider, useForm, useFormContext } from 'react-hook-form'

import {
  ArrowBottomIcon,
  Kebab,
  PostItem,
  SearchIcon,
  SubHeaderWithoutIcon,
} from '@/components/view'
import { useCarpoolSearch } from '@/services/service/useCarpoolSearch'
import { useFilterName, useFilterVisible, useSearchList } from '@/stores/carpoolSearchList'

const SearchBar = () => {
  const formMethod = useForm({ defaultValues: { search: '' } })
  const { register, watch, handleSubmit } = useFormContext()
  const watchField = watch('search')

  const { placeholder, searchOptions, toggleFilterVisibility, handleSearch } =
    useCarpoolSearch(watchField)

  const filterName = useFilterName()
  const isFilterVisible = useFilterVisible()

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

export const CarpoolSearch = () => {
  const searchList = useSearchList()

  return (
    <main className="flex-column h-full">
      <SubHeaderWithoutIcon type="null" title="검색" />
      <SearchBar />
      <ul className="scroll grow">
        {searchList.map((item) => (
          <li key={item.id}>
            <PostItem item={item} to={`/carpool/detail/${item.id}`} />
          </li>
        ))}
      </ul>
    </main>
  )
}
