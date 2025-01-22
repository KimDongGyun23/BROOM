import { Link } from 'react-router-dom'

import { Loading } from '@/components/view/Loading'
import { useCarpoolChattingRoomList } from '@/services/query/useChattingQuery'

import { ChattingItem } from './ChattingItem'

export const CarpoolChattingList = () => {
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
