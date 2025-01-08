import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BottomNav } from '@/components/view/BottomNav'
import { MainHeader } from '@/components/view/header/MainHeader'
import { Loading } from '@/components/view/Loading'
import { ChattingProfile } from '@/components/view/Profile'
import {
  useCarpoolChattingRoomList,
  useTeamChattingRoomList,
} from '@/services/query/useChattingQuery'
import { SESSION_KEYS, TAB_KEYS, TAB_LABELS } from '@/utils/constants'
import { getSessionStorageItem, setSessionStorageItem } from '@/utils/storage'

type TabType = (typeof TAB_LABELS)[number]

type ChattingTabProps = {
  currentTab: TabType
  onClick: (tab: TabType) => void
}

const ChattingTab = ({ currentTab, onClick }: ChattingTabProps) => {
  const getTabStyle = (isActive: boolean) =>
    isActive
      ? 'text-blue-600 border-b-[2px] border-b-blue-500'
      : 'text-grey-600 border-b-[2px] border-b-grey-200'

  return (
    <div className="p-medium flex px-4 py-3 font-medium">
      {TAB_LABELS.map((tab) => (
        <button
          key={tab}
          className={`grow pb-3 ${getTabStyle(currentTab === tab)}`}
          onClick={() => onClick(tab)}
          aria-selected={currentTab === tab}
          role="tab"
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

const CarpoolChattingList = () => {
  const { data: chattingList, isPending, isError } = useCarpoolChattingRoomList()

  if (isPending) return <Loading />
  if (isError) return <div>error</div>

  return (
    <>
      {chattingList.map(
        ({ id, opponent, militaryChaplain, title, lastMessage, lastMessageDaysAgo }) => (
          <Link to={`/chatting/chatting-room/carpool/${id}`} key={id}>
            <ChattingProfile
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
            <ChattingProfile
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
  const storageName = `current-chatting-tab`
  const initialTab = (getSessionStorageItem(storageName) || TAB_LABELS[0]) as TabType
  const [currentTab, setCurrentTab] = useState<TabType>(initialTab)

  const handleClickTab = (tab: TabType) => {
    setSessionStorageItem(SESSION_KEYS.ROOM_TYPE, tab === TAB_LABELS[0] ? TAB_KEYS[0] : TAB_KEYS[1])
    setSessionStorageItem(storageName, tab)
    setCurrentTab(tab)
  }

  return (
    <div className="flex-column h-full">
      <MainHeader />
      <ChattingTab currentTab={currentTab} onClick={handleClickTab} />

      <main className="flex-column scroll mb-2 mt-[30px] grow gap-4">
        {currentTab === TAB_LABELS[0] && <CarpoolChattingList />}
        {currentTab === TAB_LABELS[1] && <TeamChattingList />}
      </main>

      <BottomNav />
    </div>
  )
}
