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
}: ChatRoom) => (
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
