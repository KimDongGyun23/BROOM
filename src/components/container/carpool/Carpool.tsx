import { PostActiveToggle } from '@/components/domain/post/PostActiveToggle'
import { PostAdditionButton } from '@/components/domain/post/PostAdditionButton'
import { PostList } from '@/components/domain/post/PostList'
import { SearchBar } from '@/components/domain/post/SearchBar'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'
import { useFetchPostList } from '@/query/usePostQuery'
import { ActiveOnlyFilterStoreProvider, useIsFilteringActiveOnly } from '@/stores/activeOnlyFilter'
import { Container } from '@/styles/commonStyles'

const useCarpoolList = () => {
  const isFilteringActiveOnly = useIsFilteringActiveOnly()
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchPostList({
    urls: { isAllShow: !isFilteringActiveOnly },
  })

  return {
    postList: data?.pages.flatMap((page) => page.result) || [],
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  }
}

const CarpoolMain = () => {
  const { postList, isPending, isError, hasNextPage, fetchNextPage } = useCarpoolList()

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

export const Carpool = () => {
  return (
    <ActiveOnlyFilterStoreProvider>
      <Container>
        <MainHeader />
        <SearchBar />
        <CarpoolMain />
        <PostAdditionButton />
        <BottomNavigation />
      </Container>
    </ActiveOnlyFilterStoreProvider>
  )
}
