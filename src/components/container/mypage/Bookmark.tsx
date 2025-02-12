import { useEffect } from 'react'

import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBookmarkList } from '@/services/query/usePostQuery'
import { usePostListActions } from '@/stores/postList'
import { Container } from '@/styles/commonStyles'

export const Bookmark = () => {
  const { setPostList } = usePostListActions()
  const { data: postList, isPending, isError, hasNextPage, fetchNextPage } = useBookmarkList()

  useEffect(() => {
    if (postList) {
      setPostList(postList.pages.flatMap((page) => page.result) || [])
    }
  }, [postList, setPostList])

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="북마크" />
      <PostList
        isPending={isPending}
        isError={isError}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  )
}
