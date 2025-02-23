import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

import { ChatInformation, ChatItemContainer, ChatPostTitle } from '@/app/style/chatting'
import { Loading } from '@/shared/ui/Loading'
import { useFetchChatRoomList } from '@/query/useChattingQuery'
import type { ChatRoom } from '@/types/chat'

import { ChatProfileImageBox } from './ChatProfileImageBox'

type ChatProfileProps = {
  chatRoomInformation: ChatRoom
}

const ChatItem = ({ chatRoomInformation }: ChatProfileProps) => {
  const { boardName, lastMessage, lastMessageTime, militaryBranches, expelled } =
    chatRoomInformation

  return (
    <ChatItemContainer>
      <ChatProfileImageBox profileIconList={militaryBranches} />
      <ChatInformation>
        <ChatPostTitle>{boardName}</ChatPostTitle>
        <LastMessage $expelled={expelled}>
          {expelled ? '방장에 의해 내보내졌습니다.' : lastMessage}
        </LastMessage>
      </ChatInformation>

      {!expelled && <LastMessageTime>{lastMessageTime}</LastMessageTime>}
    </ChatItemContainer>
  )
}

export const ChatList = () => {
  const { data, isPending, isError } = useFetchChatRoomList()

  if (isPending) return <Loading />
  if (isError) return <div>error</div>

  const chatList = data?.pages.flatMap((page) => page.chatRooms) || []

  return (
    <Container>
      {chatList.map((chatRoomInformation) => (
        <Link key={chatRoomInformation.boardId} to={`/chat/${chatRoomInformation.boardId}`}>
          <ChatItem chatRoomInformation={chatRoomInformation} />
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

const LastMessage = styled.p<{ $expelled?: boolean }>`
  ${({ theme, $expelled }) =>
    theme.font(800, $expelled ? theme.colors.orange : theme.colors.black[300])};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const LastMessageTime = styled.p`
  ${({ theme }) => theme.margin(0, 0, 0, 'auto')};
  ${({ theme }) => theme.font(800, theme.colors.black[300])};
  flex-shrink: 0;
`
