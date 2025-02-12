import { useEffect } from 'react'

import { PostList } from '@/components/domain/post/PostList'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useMyPostList } from '@/services/query/usePostQuery'
import { usePostListActions } from '@/stores/postList'
import { useActiveTab } from '@/stores/postTab'
import { Container } from '@/styles/commonStyles'
import { TAB_KEYS, TAB_LIST, TAB_UPPER_KEYS } from '@/utils/constants'

const useMyPostData = () => {
  const activeTab = useActiveTab()
  const { setTab, setPost } = usePostListActions()
  const category = TAB_LIST.find((tab) => tab.label === activeTab)?.upperKey || TAB_LIST[0].upperKey

  const {
    data: postList,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useMyPostList({ urls: { category } })

  useEffect(() => {
    if (postList) {
      const tabKey = category === TAB_UPPER_KEYS[0] ? TAB_KEYS[0] : TAB_KEYS[1]
      setTab(tabKey)
      setPost(postList.pages.flatMap((page) => page.result) || [])
    }
  }, [category, postList, setPost, setTab])

  return {
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  }
}
export const MyPost = () => {
  const { isPending, isError, hasNextPage, fetchNextPage } = useMyPostData()

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
