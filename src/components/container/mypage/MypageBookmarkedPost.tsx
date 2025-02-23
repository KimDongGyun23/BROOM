import { Container } from '@/app/style/commonStyles'
import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter'
import { useFetchBookmarkList } from '@/query/useCarpoolQuery'

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
