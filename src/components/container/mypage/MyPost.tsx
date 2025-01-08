import { useState } from 'react'

import { Loading, PostItem, PostTabs, SubHeaderWithoutIcon } from '@/components/view'
import { useMyCarpoolPost, useMyTeamPost } from '@/services/query'
import type { CarpoolFetchResponse, TabType, TeamsFetchResponse } from '@/types'
import { getSessionStorageItem, setSessionStorageItem, TAB_LIST } from '@/utils'

type CarpoolPostsProps = {
  posts: CarpoolFetchResponse | undefined
}

type TeamPostsProps = {
  posts: TeamsFetchResponse | undefined
}

const CarpoolPosts = ({ posts }: CarpoolPostsProps) => {
  if (!posts) return null
  return (
    <section aria-labelledby="carpool-posts">
      {posts &&
        posts.result.map(
          ({ carpoolBoardId, title, createdAt, trainingDate, departPlace, departTime, full }) => (
            <PostItem
              key={carpoolBoardId}
              title={title}
              createdAt={createdAt}
              trainingDate={trainingDate}
              place={departPlace}
              time={departTime}
              isFull={full}
              to={`/carpool/detail/${carpoolBoardId}`}
            />
          ),
        )}
    </section>
  )
}

const TeamPosts = ({ posts }: TeamPostsProps) => {
  if (!posts) return null
  return (
    <section aria-labelledby="team-posts">
      {posts &&
        posts.result.map(
          ({ teamBoardId, title, createdAt, trainingDate, meetingPlace, meetingTime, full }) => (
            <PostItem
              key={teamBoardId}
              title={title}
              createdAt={createdAt}
              trainingDate={trainingDate}
              place={meetingPlace}
              time={meetingTime}
              isFull={full}
              to={`/team/detail/${teamBoardId}`}
            />
          ),
        )}
    </section>
  )
}

export const MyPost = () => {
  const storageKey = `current-post-tab`
  const initialTab = (getSessionStorageItem(storageKey) || TAB_LIST[0]) as TabType
  const [currentTab, setCurrentTab] = useState<TabType>(initialTab)

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

  const handleTabClick = (tab: TabType) => {
    if (tab === TAB_LIST[0]) refetchCarpoolPosts()
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
        {currentTab === TAB_LIST[0] && <CarpoolPosts posts={carpoolPostsData} />}
        {currentTab === TAB_LIST[1] && <TeamPosts posts={teamPostsData} />}
      </div>
    </main>
  )
}
