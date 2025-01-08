import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BottomNav, MainHeader } from '@/components/view'
import { Loading } from '@/components/view/Loading'
import { ChattingProfile } from '@/components/view/Profile'
import {
  useCarpoolChattingRoomList,
  useTeamChattingRoomList,
} from '@/services/query/useChattingQuery'
import {
  getSessionStorageItem,
  SESSION_ROOM_TYPE,
  setSessionStorageItem,
  TAB_LIST,
  TAB_LIST_EN,
} from '@/utils'

type TabType = (typeof TAB_LIST)[number]

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
      {TAB_LIST.map((tab) => (
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
  const initialTab = (getSessionStorageItem(storageName) || TAB_LIST[0]) as TabType
  const [currentTab, setCurrentTab] = useState<TabType>(initialTab)

  const handleClickTab = (tab: TabType) => {
    setSessionStorageItem(SESSION_ROOM_TYPE, tab === TAB_LIST[0] ? TAB_LIST_EN[0] : TAB_LIST_EN[1])
    setSessionStorageItem(storageName, tab)
    setCurrentTab(tab)
  }

  return (
    <div className="flex-column h-full">
      <MainHeader />
      <ChattingTab currentTab={currentTab} onClick={handleClickTab} />

      <main className="flex-column scroll mb-2 mt-[30px] grow gap-4">
        {currentTab === TAB_LIST[0] && <CarpoolChattingList />}
        {currentTab === TAB_LIST[1] && <TeamChattingList />}
      </main>

      <BottomNav />
    </div>
  )
}
