import { Container } from '@/app/style/commonStyles'
import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { ActiveOnlyFilterStoreProvider } from '@/features/board/model/activeOnlyFilter'
import { useFetchMyPostList } from '@/query/useCarpoolQuery'

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
