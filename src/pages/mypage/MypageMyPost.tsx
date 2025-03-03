import { Container } from '@/app/style/commonStyles'
import { useFetchMyPostList } from '@/features/board/api/useBoard.query'
import { RecruitingStoreProvider } from '@/features/filter/model/recruiting.store'
import { PostList } from '@/widgets/post-list/ui/PostList'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const MypageMyPost = () => {
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchMyPostList()
  const postList = data?.pages.flatMap((page) => page.result) || []

  return (
    <RecruitingStoreProvider>
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
    </RecruitingStoreProvider>
  )
}
