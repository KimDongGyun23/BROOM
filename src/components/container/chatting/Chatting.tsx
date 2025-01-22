import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ChattingItem } from '@/components/domain/chatting/ChattingItem'
import { PostTabs } from '@/components/domain/post/PostTabs'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { Loading } from '@/components/view/Loading'
import { MainHeader } from '@/components/view/MainHeader'
import {
  useCarpoolChattingRoomList,
  useTeamChattingRoomList,
} from '@/services/query/useChattingQuery'
import { TAB_KEYS, TAB_LABELS } from '@/utils/constants'
import { getSessionStorageItem, SESSION_KEYS, setSessionStorageItem } from '@/utils/storage'

type TabType = (typeof TAB_LABELS)[number]

const CarpoolChattingList = () => {
  const { data: chattingList, isPending, isError } = useCarpoolChattingRoomList()

  if (isPending) return <Loading />
  if (isError) return <div>error</div>

  return (
    <>
      {chattingList.map(
        ({ id, opponent, militaryChaplain, title, lastMessage, lastMessageDaysAgo }) => (
          <Link to={`/chatting/chatting-room/carpool/${id}`} key={id}>
            <ChattingItem
              opponent={opponent}
              iconType={militaryChaplain}
              title={title}
              lastMessage={lastMessage}
              lastMessageDaysAgo={lastMessageDaysAgo}
            />
          </Link>
        ),
      )}
    </>
  )
}

const TeamChattingList = () => {
  const { data: chattingList, isPending, isError } = useTeamChattingRoomList()

  if (isPending) return <Loading />
  if (isError) return <div>error</div>

  return (
    <>
      {chattingList.map(
        ({ id, opponent, militaryChaplain, title, lastMessage, lastMessageDaysAgo }) => (
          <Link to={`/chatting/chatting-room/team/${id}`} key={id}>
            <ChattingItem
              opponent={opponent}
              iconType={militaryChaplain}
              title={title}
              lastMessage={lastMessage}
              lastMessageDaysAgo={lastMessageDaysAgo}
            />
          </Link>
        ),
      )}
    </>
  )
}

export const Chatting = () => {
  const initialTab = (getSessionStorageItem(SESSION_KEYS.CHATTING_TAB) || TAB_LABELS[0]) as TabType
  const [currentTab, setCurrentTab] = useState<TabType>(initialTab)

  const handleClickTab = (tab: TabType) => {
    setSessionStorageItem(SESSION_KEYS.ROOM_TYPE, tab === TAB_LABELS[0] ? TAB_KEYS[0] : TAB_KEYS[1])
    setSessionStorageItem(SESSION_KEYS.CHATTING_TAB, tab)
    setCurrentTab(tab)
  }

  return (
    <Container>
      <MainHeader />
      <PostTabs currentTab={currentTab} onTabClick={handleClickTab} />

      <MainContent>
        {currentTab === TAB_LABELS[0] && <CarpoolChattingList />}
        {currentTab === TAB_LABELS[1] && <TeamChattingList />}
      </MainContent>

      <BottomNavigation />
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const MainContent = styled.main`
  flex-grow: 1;
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.margin('container', 0, 'container', 0)};
  overflow-y: scroll;
`
