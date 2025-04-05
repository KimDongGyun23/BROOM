import { Container } from '@/app/style/commonStyles'
import { useFetchBookmarkedPostList } from '@/entities/board/api/useBoard.query'
import { PostList } from '@/entities/board/ui/PostList'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const BookmarkedPost = () => {
  const { data, hasNextPage, fetchNextPage } = useFetchBookmarkedPostList()
  const bookmarkedPostList = data?.pages.flatMap((page) => page.result) || []

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="북마크" />
      <PostList
        postList={bookmarkedPostList}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  )
}
