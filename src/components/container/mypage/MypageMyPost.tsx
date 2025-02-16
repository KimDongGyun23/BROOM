import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useFetchMyPostList } from '@/query/useCarpoolQuery'
import { ActiveOnlyFilterStoreProvider } from '@/stores/activeOnlyFilter'
import { Container } from '@/styles/commonStyles'

export const MypageMyPost = () => {
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchMyPostList()
  const postList = data?.pages.flatMap((page) => page.result) || []

  return (
    <ActiveOnlyFilterStoreProvider>
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
    </ActiveOnlyFilterStoreProvider>
  )
}
