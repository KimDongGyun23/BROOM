import { Container } from '@/app/style/commonStyles'
import { useFetchBookmarkList } from '@/entities/board/api/useBoard.query'
import { RecruitingStoreProvider } from '@/features/filter/model/recruiting.store'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'
import { PostList } from '@/widgets/post-list/ui/PostList'

export const MypageBookmarkedPost = () => {
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchBookmarkList()
  const bookmarkedPostList = data?.pages.flatMap((page) => page.result) || []

  return (
    <RecruitingStoreProvider>
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
    </RecruitingStoreProvider>
  )
}
