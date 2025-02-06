import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { EmptyMessage } from '@/components/view/Error'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useToggle } from '@/hooks/useToggle'
import { useSearchCarpoolList } from '@/services/query/useCarpoolQuery'
import { usePostListActions } from '@/stores/postList'
import { ERROR_MESSAGES, SEARCH_OPTIONS, TAB_UPPER_KEYS } from '@/utils/constants'

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

  return <PostList items={searchList.result} currentPage="carpool" />
}

const useSearchData = () => {
  const currentTab = TAB_UPPER_KEYS[0]
  const { setTab, setPost } = usePostListActions()
  const [showActiveOnly, toggleShowActiveOnly] = useToggle(false)

  const {
    data: allCarpools,
    isPending: allPending,
    isError: allError,
  } = usePostList({ urls: { category: currentTab } })

  const {
    data: activeCarpools,
    refetch: refetchActiveCarpools,
    isPending: activePending,
    isError: activeError,
  } = useActivePostList({ urls: { category: currentTab } })

  const mapInfiniteDataToPosts = (data: InfiniteData<PostResponse> | undefined) => {
    if (!data) return []
    return data.pages.flatMap((page) => page.result)
  }

  const handleRecruitToggle = () => {
    refetchActiveCarpools()
    toggleShowActiveOnly()
  }

  useEffect(() => {
    if (activeCarpools || allCarpools) {
      setTab('carpool')
      setPost(
        showActiveOnly
          ? mapInfiniteDataToPosts(activeCarpools)
          : mapInfiniteDataToPosts(allCarpools),
      )
    }
  }, [activeCarpools, allCarpools, setPost, setTab, showActiveOnly])

  return {
    showActiveOnly,
    isPending: allPending || activePending,
    isError: allError || activeError,
    handleRecruitToggle,
  }
}

export const CarpoolSearch = () => {
  const [searchParams] = useSearchParams()
  const filterName = searchParams.get('filterName')
  const searchName = searchParams.get('searchName')

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="검색" />
      <SearchBar currentTab="carpool" />
      <PostList isPending={isPending} isError={isError} />
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`
