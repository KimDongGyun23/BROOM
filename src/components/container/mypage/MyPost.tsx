import { useState } from 'react'

import { Loading, PostItem, SubHeaderWithoutIcon } from '@/components/view'
import { useMyCarpoolPost, useMyTeammatePost } from '@/services/query'
import type { CarpoolFetchResponse, TeammatesFetchResponse } from '@/types'
import { getSessionStorageItem, setSessionStorageItem, TAB_LIST } from '@/utils'

type TabType = (typeof TAB_LIST)[number]

type PostTabsType = {
  currentTab: TabType
  onTabClick: (tab: TabType) => void
}

type CarpoolPostsProps = {
  posts: CarpoolFetchResponse | undefined
}

type TeammatePostsProps = {
  posts: TeammatesFetchResponse | undefined
}

const PostTabs = ({ currentTab, onTabClick }: PostTabsType) => {
  return (
    <ul className="p-medium flex px-4 py-3 font-medium">
      {TAB_LIST.map((tab) => {
        const tabStyle =
          currentTab === tab
            ? 'text-blue-6 border-b-[2px] border-b-blue-5'
            : 'text-grey-6 border-b-[2px] border-b-grey-2'

        return (
          <li>
            <button key={tab} className={`grow pb-3 ${tabStyle}`} onClick={() => onTabClick(tab)}>
              {tab}
            </button>
          </li>
        )
      })}
    </ul>
  )
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

const TeammatePosts = ({ posts }: TeammatePostsProps) => {
  if (!posts) return null
  return (
    <section aria-labelledby="teammate-posts">
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
              to={`/teammate/detail/${teamBoardId}`}
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
    data: teammatePostsData,
    refetch: refetchTeammatePosts,
    isLoading: teammateLoading,
    error: teammateError,
  } = useMyTeammatePost()

  const handleTabClick = (tab: TabType) => {
    if (tab === TAB_LIST[0]) refetchCarpoolPosts()
    else refetchTeammatePosts()

    setSessionStorageItem(storageKey, tab)
    setCurrentTab(tab)
  }

  if (carpoolLoading || teammateLoading) return <Loading />
  if (carpoolError || teammateError) return <div>error</div>

  return (
    <main className="flex-column h-full">
      <SubHeaderWithoutIcon type="null" title="내가 올린 게시물" />
      <PostTabs currentTab={currentTab} onTabClick={handleTabClick} />

      <div className="scroll grow">
        {currentTab === TAB_LIST[0] && <CarpoolPosts posts={carpoolPostsData} />}
        {currentTab === TAB_LIST[1] && <TeammatePosts posts={teammatePostsData} />}
      </div>
    </main>
  )
}
