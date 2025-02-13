import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useFetchBookmarkList } from '@/query/usePostQuery'
import { Container } from '@/styles/commonStyles'

const useBookmarkList = () => {
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useFetchBookmarkList()

  return {
    postList: data?.pages.flatMap((page) => page.result) || [],
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  }
}

export const Bookmark = () => {
  const { postList, isPending, isError, hasNextPage, fetchNextPage } = useBookmarkList()

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="북마크" />
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
