import { useSearchParams } from 'react-router-dom'

import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/header/SubHeader'
import { Loading } from '@/components/view/Loading'
import { SearchBar } from '@/components/view/SearchBar'
import { useCarpoolSearchList } from '@/services/query'
import { SEARCH_OPTIONS } from '@/utils/constants'

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

  return <PostList items={searchList} to={`/carpool/detail`} />
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
