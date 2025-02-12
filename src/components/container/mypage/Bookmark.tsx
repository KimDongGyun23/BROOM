import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBookmarkList } from '@/services/query/usePostQuery'
import { Container } from '@/styles/commonStyles'

export const Bookmark = () => {
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useBookmarkList()

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="북마크" />
      <PostList
        postList={data?.pages.flatMap((page) => page.result) || []}
        isPending={isPending}
        isError={isError}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  )
}
