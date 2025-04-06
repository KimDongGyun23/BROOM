import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { EmptyMessage } from '@/shared/ui/Error'

import { useChatList } from '../model/useChatList'

import { ChatRoomItem } from './ChatRoomItem'

export const ChatRoomList = () => {
  const { chatRoomList, isError } = useChatList()

  if (isError) return <EmptyMessage label={ERROR_MESSAGES.FETCH_FAIL} />
  if (!chatRoomList || !chatRoomList.length) return <EmptyMessage label={ERROR_MESSAGES.NO_CHAT} />

  return (
    <Container>
      {chatRoomList.map((chatRoom) => (
        <Link key={chatRoom.boardId} to={`/chat/${chatRoom.boardId}`}>
          <ChatRoomItem {...chatRoom} />
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
