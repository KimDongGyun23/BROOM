import { useEffect } from 'react'
import styled from 'styled-components'

import { PostList } from '@/components/domain/post/PostList'
import { PostTabs } from '@/components/domain/post/PostTabs'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useMyCarpoolPost, useMyTeamPost } from '@/services/query/useMypageQuery'
import { PostTabStoreProvider, useActiveTab } from '@/stores/postTab'
import { TAB_LABELS } from '@/utils/constants'

const PostContent = () => {
  const activeTab = useActiveTab()

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

  useEffect(() => {
    if (activeTab === TAB_LABELS[0]) refetchCarpoolPosts()
    else refetchTeamPosts()
  }, [activeTab, refetchCarpoolPosts, refetchTeamPosts])

  if (carpoolLoading || teamLoading) return <Loading />
  if (carpoolError || teamError) return <div>error</div>

  return (
    <ScrollContainer>
      {activeTab === TAB_LABELS[0] && <PostList items={carpoolPostsData} to={`/carpool/detail`} />}
      {activeTab === TAB_LABELS[1] && <PostList items={teamPostsData} to={`/team/detail`} />}
    </ScrollContainer>
  )
}

export const MyPost = () => {
  return (
    <PostTabStoreProvider>
      <MainContainer>
        <SubHeaderWithoutIcon type="null" title="내가 올린 게시물" />
        <PostTabs />
        <PostContent />
      </MainContainer>
    </PostTabStoreProvider>
  )
}

const MainContainer = styled.main`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const ScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`
