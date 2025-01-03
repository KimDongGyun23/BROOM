import { useSearchParams } from 'react-router-dom'

import { Loading, PostItem, SearchBar, SubHeaderWithoutIcon } from '@/components/view'
import { useCarpoolSearchList } from '@/services/query'
import { SEARCH_OPTIONS } from '@/utils'

type SearchListProps = {
  filterName: string | null
  searchName: string | null
}

const SearchList = ({ filterName, searchName }: SearchListProps) => {
  if (!searchName) {
    console.error('검색어 없음')
    return <p>noData</p>
  }

  const {
    data: searchList,
    isPending,
    isError,
  } = useCarpoolSearchList({
    urls: {
      category: filterName || SEARCH_OPTIONS[0].label,
      keyword: searchName,
    },
  })

  if (isPending) return <Loading />
  if (isError) {
    console.error('데이터 불러오기 실패')
    return <p>error</p>
  }

  return (
    <ul className="scroll grow">
      {searchList.map((item) => (
        <li key={item.id}>
          <PostItem item={item} to={`/carpool/detail/${item.id}`} />
        </li>
      ))}
    </ul>
  )
}

export const CarpoolSearch = () => {
  const [searchParams] = useSearchParams()
  const filterName = searchParams.get('filterName')
  const searchName = searchParams.get('searchName')

  return (
    <main className="flex-column h-full">
      <SubHeaderWithoutIcon type="null" title="검색" />
      <SearchBar currentTab="carpool" />
      <SearchList filterName={filterName} searchName={searchName} />
    </main>
  )
}
