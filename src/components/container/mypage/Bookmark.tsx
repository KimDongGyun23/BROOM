import { useEffect } from 'react'

import { PostList } from '@/components/domain/post/PostList'
import { PostTabs } from '@/components/domain/post/PostTabs'
import { EmptyMessage } from '@/components/view/Error'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBookmarkList } from '@/services/query/usePostQuery'
import { usePostListActions } from '@/stores/postList'
import { PostTabStoreProvider, useActiveTab } from '@/stores/postTab'
import { Container } from '@/styles/commonStyles'
import { ERROR_MESSAGES, TAB_KEYS, TAB_LIST, TAB_UPPER_KEYS } from '@/utils/constants'

const useBookmarkData = () => {
  const activeTab = useActiveTab()
  const { setTab, setPost } = usePostListActions()
  const category = TAB_LIST.find((tab) => tab.label === activeTab)?.upperKey || TAB_LIST[0].upperKey

  const {
    data: postList,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useBookmarkList({ urls: { category } })

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

const BookmarkContent = () => {
  const { isPending, isError, hasNextPage, fetchNextPage } = useBookmarkData()

  return (
    <Container>
      <SubHeaderWithoutIcon type="null" title="북마크" />
      <PostTabs />

      {isPending ? (
        <Loading />
      ) : isError ? (
        <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />
      ) : (
        <PostList hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      )}
    </Container>
  )
}

export const Bookmark = () => {
  return (
    <PostTabStoreProvider>
      <BookmarkContent />
    </PostTabStoreProvider>
  )
}
