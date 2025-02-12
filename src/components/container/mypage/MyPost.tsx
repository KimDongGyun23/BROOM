import { useEffect } from 'react'

import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useMyPostList } from '@/services/query/usePostQuery'
import { usePostListActions } from '@/stores/postList'
import { Container } from '@/styles/commonStyles'

export const MyPost = () => {
  const { setPostList } = usePostListActions()
  const { data: postList, isPending, isError, hasNextPage, fetchNextPage } = useMyPostList()

  useEffect(() => {
    if (postList) {
      setPostList(postList.pages.flatMap((page) => page.result) || [])
    }
  }, [postList, setPostList])

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="내가 올린 게시물" />
      <PostList
        isPending={isPending}
        isError={isError}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  )
}
