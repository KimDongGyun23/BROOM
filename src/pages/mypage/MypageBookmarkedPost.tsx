import { Container } from '@/app/style/commonStyles'
import { useFetchBookmarkList } from '@/features/board/api/useBoard.query'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter.store'
import { PostList } from '@/features/board/ui/PostList'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const MypageBookmarkedPost = () => {
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchBookmarkList()
  const bookmarkedPostList = data?.pages.flatMap((page) => page.result) || []

  return (
    <ActiveOnlyFilterStoreProvider>
      <Container>
        <SubHeaderWithoutIcon type="null" title="북마크" />
        <PostList
          postList={bookmarkedPostList}
          isPending={isPending}
          isError={isError}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </Container>
    </ActiveOnlyFilterStoreProvider>
  )
}
