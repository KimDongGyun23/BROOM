import { Link } from 'react-router-dom'

import { ChattingItem } from '@/components/domain/chatting/ChattingItem'
import { Loading } from '@/components/view/Loading'
import { useTeamChattingRoomList } from '@/services/query/useChattingQuery'

export const TeamChattingList = () => {
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
