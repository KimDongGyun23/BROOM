import { Container } from '@/app/style/commonStyles'
import { useFetchBookmarkedPostList } from '@/entities/board/api/useBoard.query'
import { RecruitingStoreProvider } from '@/features/filter/model/recruiting.store'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { PostList } from '@/widgets/list/PostList'

export const BookmarkedPost = () => {
  const { data, hasNextPage, fetchNextPage } = useFetchBookmarkedPostList()
  const bookmarkedPostList = data?.pages.flatMap((page) => page.result) || []

  return (
    <RecruitingStoreProvider>
      <Container>
        <SubHeaderWithoutIcon type="null" title="북마크" />
        <PostList
          postList={bookmarkedPostList}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </Container>
    </RecruitingStoreProvider>
  )
}
