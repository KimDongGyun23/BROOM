import { useSearchParams } from 'react-router-dom'

import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useFetchSearchList } from '@/query/usePostQuery'
import { ActiveOnlyFilterStoreProvider, useIsFilteringActiveOnly } from '@/stores/activeOnlyFilter'
import { Container } from '@/styles/commonStyles'
import { SEARCH_OPTIONS } from '@/utils/constants'

const useCarpoolSearchList = () => {
  const [searchParams] = useSearchParams()
  const [filterName, searchName] = [
    searchParams.get('filterName') || '',
    searchParams.get('searchName') || '',
  ]
  const filterKey = SEARCH_OPTIONS.find((option) => option.label === filterName)?.key || ''

  const isFilteringActiveOnly = useIsFilteringActiveOnly()

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchSearchList({
    urls: {
      type: filterKey,
      keyword: searchName,
      isAllShow: !isFilteringActiveOnly,
    },
  })

  return {
    postList: data?.pages.flatMap((page) => page.result) || [],
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  }
}

const CarpoolSearchMain = () => {
  const { postList, isPending, isError, hasNextPage, fetchNextPage } = useCarpoolSearchList()

  return (
    <>
      <PostActiveToggle />
      <PostList
        postList={postList}
        isPending={isPending}
        isError={isError}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  )
}

export const CarpoolSearch = () => {
  return (
    <ActiveOnlyFilterStoreProvider>
      <Container>
        <SubHeaderWithoutIcon type="null" title="검색" />
        <SearchBar />
        <CarpoolSearchMain />
      </Container>
    </ActiveOnlyFilterStoreProvider>
  )
}
