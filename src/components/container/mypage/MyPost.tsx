import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useFetchMyPostList } from '@/query/usePostQuery'
import { Container } from '@/styles/commonStyles'

const useMyPostList = () => {
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchMyPostList()

  return {
    postList: data?.pages.flatMap((page) => page.result) || [],
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  }
}

export const MyPost = () => {
  const { postList, isPending, isError, hasNextPage, fetchNextPage } = useMyPostList()

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="내가 올린 게시물" />
      <PostList
        postList={postList}
        isPending={isPending}
        isError={isError}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  )
}
