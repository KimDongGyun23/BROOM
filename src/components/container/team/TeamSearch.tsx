import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useTeamSearchList } from '@/services/query/useTeamQuery'
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
  } = useTeamSearchList({
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

export const TeamSearch = () => {
  const [searchParams] = useSearchParams()
  const filterName = searchParams.get('filterName')
  const searchName = searchParams.get('searchName')

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="검색" />
      <SearchBar currentTab="team" />
      <SearchList filterName={filterName} searchName={searchName} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
