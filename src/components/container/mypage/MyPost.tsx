import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useMyPostList } from '@/services/query/usePostQuery'
import { Container } from '@/styles/commonStyles'

export const MyPost = () => {
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useMyPostList()

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="내가 올린 게시물" />
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
