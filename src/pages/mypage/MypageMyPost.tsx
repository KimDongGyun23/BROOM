import { Container } from '@/app/style/commonStyles'
import { useFetchMyPostList } from '@/entities/board/api/useBoard.query'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { PostList } from '@/widgets/list/PostList'

export const MypageMyPost = () => {
  const { data, hasNextPage, fetchNextPage } = useFetchMyPostList()
  const postList = data?.pages.flatMap((page) => page.result) || []

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="내가 올린 게시물" />
      <PostList postList={postList} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </Container>
  )
}
