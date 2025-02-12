import { useSearchParams } from 'react-router-dom'

import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useSearchPostList } from '@/services/query/usePostQuery'
import { ActiveOnlyFilterStoreProvider, useIsFilteringActiveOnly } from '@/stores/activeOnlyFilter'
import { Container } from '@/styles/commonStyles'
import { SEARCH_OPTIONS } from '@/utils/constants'

const CarpoolSearchMain = () => {
  const [searchParams] = useSearchParams()
  const isFilteringActiveOnly = useIsFilteringActiveOnly()

  const [filterName, searchName] = [
    searchParams.get('filterName') || '',
    searchParams.get('searchName') || '',
  ]
  const filterKey = SEARCH_OPTIONS.find((option) => option.label === filterName)?.key || ''

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useSearchPostList({
    urls: {
      type: filterKey,
      keyword: searchName,
      isAllShow: !isFilteringActiveOnly,
    },
  })

  const postList = data?.pages.flatMap((page) => page.result) || []

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
