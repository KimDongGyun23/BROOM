import styled from 'styled-components'

import type { ChatRoom } from '@/entities/chat/model/chat.type'
import { ChatProfileImageBox } from '@/entities/chat/ui/ChatProfileImageBox'
import { ChatInformation, ChatItemContainer, ChatPostTitle } from '@/entities/chat/ui/ChatStyle'

export const ChatItem = ({
  boardName,
  militaryBranches,
  expelled,
  lastMessage,
  lastMessageTime,
}: ChatRoom) => {
  const messageText = expelled
    ? '방장에 의해 내보내졌습니다.'
    : lastMessage.length
      ? lastMessage
      : '[ 아직 메세지가 존재하지 않습니다. ]'

  const isNoMessage = !expelled && !lastMessage.length

  return (
    <ChatItemContainer>
      <ChatProfileImageBox profileIconList={militaryBranches} />
      <ChatInformation>
        <ChatPostTitle>{boardName}</ChatPostTitle>
        <LastMessage $expelled={expelled} $noMessage={isNoMessage}>
          {messageText}
        </LastMessage>
      </ChatInformation>
      {!expelled && <LastMessageTime>{lastMessageTime}</LastMessageTime>}
    </ChatItemContainer>
  )
}

const LastMessage = styled.p<{ $expelled?: boolean; $noMessage?: boolean }>`
  ${({ theme, $expelled, $noMessage }) => {
    if ($expelled) return theme.font(800, theme.colors.orange)
    if ($noMessage) return theme.font(800, theme.colors.black[200])
    return theme.font(800, theme.colors.black[300])
  }};
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
