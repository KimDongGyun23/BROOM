import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { EmptyMessage } from '@/components/view/Error'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useSearchCarpoolList } from '@/services/query/useCarpoolQuery'
import { ERROR_MESSAGES, SEARCH_OPTIONS } from '@/utils/constants'

import { ErrorPage } from '../home/ErrorPage'

type SearchListProps = {
  filterName: string | null
  searchName: string | null
}

const SearchList = ({ filterName, searchName }: SearchListProps) => {
  if (!searchName) return <EmptyMessage label={ERROR_MESSAGES.NO_SEARCH_NAME} />

  const {
    data: searchList,
    isPending,
    isError,
  } = useSearchCarpoolList({
    urls: {
      category: filterName || SEARCH_OPTIONS[0].label,
      keyword: searchName,
    },
  })

  if (isPending) return <Loading />
  if (isError) return <ErrorPage />

  return <PostList items={searchList} to={`/carpool/detail`} />
}

export const CarpoolSearch = () => {
  const [searchParams] = useSearchParams()
  const filterName = searchParams.get('filterName')
  const searchName = searchParams.get('searchName')

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="검색" />
      <SearchBar currentTab="carpool" />
      <SearchList filterName={filterName} searchName={searchName} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
