import { useState } from 'react'
import styled from 'styled-components'

import { PostList } from '@/components/domain/post/PostList'
import { PostTabs } from '@/components/domain/post/PostTabs'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useMyCarpoolPost, useMyTeamPost } from '@/services/query/useMypageQuery'
import type { TabLabel } from '@/utils/constants'
import { TAB_LABELS } from '@/utils/constants'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

export const MyPost = () => {
  const [currentTab, setCurrentTab] = useState<TabLabel>(
    (getSessionStorageItem(SESSION_KEYS.POST_TAB) as TabLabel) || TAB_LABELS[0],
  )

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

  const handleTabClick = (tab: TabLabel) => {
    if (tab === TAB_LABELS[0]) refetchCarpoolPosts()
    else refetchTeamPosts()
    setCurrentTab(tab)
  }

  if (carpoolLoading || teamLoading) return <Loading />
  if (carpoolError || teamError) return <div>error</div>

  return (
    <MainContainer>
      <SubHeaderWithoutIcon type="null" title="내가 올린 게시물" />
      <PostTabs currentTab={currentTab} onTabClick={handleTabClick} />

      <ScrollContainer>
        {currentTab === TAB_LABELS[0] && (
          <PostList items={carpoolPostsData} to={`/carpool/detail`} />
        )}
        {currentTab === TAB_LABELS[1] && <PostList items={teamPostsData} to={`/team/detail`} />}
      </ScrollContainer>
    </MainContainer>
  )
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`
