import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useFetchBookmarkList } from '@/query/useCarpoolQuery'
import { Container } from '@/styles/commonStyles'

export const MypageBookmarkedPost = () => {
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchBookmarkList()
  const bookmarkedPostList = data?.pages.flatMap((page) => page.result) || []

  return (
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
  )
}
