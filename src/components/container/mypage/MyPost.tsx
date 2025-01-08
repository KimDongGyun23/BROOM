import { useState } from 'react'

import { PostList } from '@/components/domain/post/PostList'
import { PostTabs } from '@/components/domain/post/PostTabs'
import { SubHeaderWithoutIcon } from '@/components/view/header/SubHeader'
import { Loading } from '@/components/view/Loading'
import { useMyCarpoolPost, useMyTeamPost } from '@/services/query'
import type { TabLabelType } from '@/utils/constants'
import { TAB_LABELS } from '@/utils/constants'
import { getSessionStorageItem, setSessionStorageItem } from '@/utils/storage'

export const MyPost = () => {
  const storageKey = `current-post-tab`
  const initialTab = (getSessionStorageItem(storageKey) || TAB_LABELS[0]) as TabLabelType
  const [currentTab, setCurrentTab] = useState<TabLabelType>(initialTab)

  const {
    data: carpoolPostsData,
    refetch: refetchCarpoolPosts,
    isLoading: carpoolLoading,
    error: carpoolError,
  } = useMyCarpoolPost()

  const {
    data: teamPostsData,
    refetch: refetchTeamPosts,
    isLoading: teamLoading,
    error: teamError,
  } = useMyTeamPost()

  const handleTabClick = (tab: TabLabelType) => {
    if (tab === TAB_LABELS[0]) refetchCarpoolPosts()
    else refetchTeamPosts()

    setSessionStorageItem(storageKey, tab)
    setCurrentTab(tab)
  }

  if (carpoolLoading || teamLoading) return <Loading />
  if (carpoolError || teamError) return <div>error</div>

  return (
    <main className="flex-column h-full">
      <SubHeaderWithoutIcon type="null" title="내가 올린 게시물" />
      <PostTabs currentTab={currentTab} onTabClick={handleTabClick} />

      <div className="scroll grow">
        {currentTab === TAB_LABELS[0] && (
          <PostList items={carpoolPostsData} to={`/carpool/detail`} />
        )}
        {currentTab === TAB_LABELS[1] && <PostList items={teamPostsData} to={`/team/detail`} />}
      </div>
    </main>
  )
}
