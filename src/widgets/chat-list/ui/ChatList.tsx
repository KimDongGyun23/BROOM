import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

import { useFetchChatRoomList } from '@/entities/chat/api/useChat.query'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'
import { Loading } from '@/shared/ui/Loading'
import { ChatItem } from '@/widgets/chat-list/ui/ChatItem'

export const ChatList = () => {
  const { data, isPending, isError } = useFetchChatRoomList()

  if (isPending) return <Loading />
  if (isError) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />

  const chatList = data?.pages.flatMap((page) => page.chatRooms) || []

  if (!chatList || !chatList.length) return <EmptyMessage label={ERROR_MESSAGES.NO_CHAT} />

  return (
    <Container>
      {chatList.map((chatRoom) => (
        <Link key={chatRoom.boardId} to={`/chat/${chatRoom.boardId}`}>
          <ChatItem {...chatRoom} />
        </Link>
      ))}
    </Container>
  )
}

const Container = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
  ${({ theme }) => theme.margin('container', 0)};
  flex-grow: 1;
  overflow-y: scroll;
`
