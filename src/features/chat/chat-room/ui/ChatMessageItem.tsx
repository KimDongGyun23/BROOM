import { css, styled } from 'styled-components'

import { useUserData } from '@/entities/auth/model/auth.store'
import type { Message } from '@/entities/chat/model/chat.type'
import { ProfileImage } from '@/shared/ui/ProfileImage'

export const ChatMessageItem = ({ messageData }: { messageData: Message }) => {
  const user = useUserData()
  const { militaryBranch, senderNickname, message, createdAt } = messageData

  const isMyMessage = senderNickname === user?.nickname

  return (
    <MessageContainer $isMyMessage={isMyMessage}>
      {isMyMessage ? (
        <MessageBubble $isMyMessage>{message}</MessageBubble>
      ) : (
        <>
          <ProfileImage size="sm" iconType={militaryBranch} />
          <BubbleContainer>
            <SenderName className="sender-nickname">{senderNickname}</SenderName>
            <MessageBubble>{message}</MessageBubble>
          </BubbleContainer>
        </>
      )}
      <Timestamp>{createdAt}</Timestamp>
    </MessageContainer>
  )
}

const BubbleContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xs')};
`

const SenderName = styled.span`
  ${({ theme }) => theme.font(800, theme.colors.black[500])};
`

const MessageContainer = styled.div<{ $isMyMessage: boolean }>`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, 'md')};
  flex-direction: ${({ $isMyMessage }) => ($isMyMessage ? 'row-reverse' : 'row')};
`

const Timestamp = styled.span`
  ${({ theme }) => theme.font(900, theme.colors.black[500])};
  flex-shrink: 0;
  align-self: flex-end;
`

const MessageBubble = styled.div<{ $isMyMessage?: boolean }>`
  ${({ theme, $isMyMessage }) => css`
    ${theme.borderRadius($isMyMessage ? 'myMessage' : 'opponentsMessage')};
    ${theme.padding('bubble')};
    ${theme.font(800, $isMyMessage ? theme.colors.black[100] : theme.colors.black[600])};
    background-color: ${$isMyMessage ? theme.colors.black[500] : theme.colors.black[100]};
  `}
`
