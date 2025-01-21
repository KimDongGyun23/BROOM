import styled from 'styled-components'

import { ProfileImage } from '@/components/view/ProfileImage'
import { useScrollToBottom } from '@/hooks/useScrollToBottom'
import { useMessageData } from '@/stores/message'
import type { MilitaryBranchCode } from '@/utils/constants'

type MessageListProps = {
  opponent: string
  iconType: MilitaryBranchCode
}

export const MessageList = ({ opponent, iconType }: MessageListProps) => {
  const messageList = useMessageData()
  const ref = useScrollToBottom(messageList)

  return (
    <Container ref={ref}>
      {messageList?.map(({ senderName, content, createdAt }, index) => {
        const isMyMessage = senderName !== opponent

        return (
          <Message key={index} $isMyMessage={isMyMessage}>
            {!isMyMessage && <ProfileImage size="sm" iconType={iconType} />}
            <Bubble isMyMessage={isMyMessage}>{content}</Bubble>
            <span className="message-time">{createdAt}</span>
          </Message>
        )
      })}
    </Container>
  )
}

const Container = styled.main`
  flex-grow: 1;
  ${({ theme }) => theme.flexBox('column', undefined, undefined, theme.gap.xl)};
  ${({ theme }) => theme.margin(0, 'container', 0, 'container')};
  padding: ${({ theme }) => theme.gap.xl} 0;
  overflow-y: scroll;
`

const Message = styled.div<{ $isMyMessage: boolean }>`
  ${({ theme }) => theme.flexBox('row', 'center', undefined, theme.gap.lg)};
  flex-direction: ${({ $isMyMessage }) => ($isMyMessage ? 'row-reverse' : 'row')};

  .message-time {
    flex-shrink: 0;
    align-self: flex-end;
    ${({ theme }) => theme.font(900, theme.colors.black[500])};
  }
`

const Bubble = styled.div<{ isMyMessage: boolean }>`
  padding: 10px 16px;
  border-radius: 20px;
  background-color: ${({ theme, isMyMessage }) =>
    isMyMessage ? theme.colors.black[500] : theme.colors.black[100]};
  color: ${({ theme, isMyMessage }) =>
    isMyMessage ? theme.colors.black[100] : theme.colors.black[600]};
  border-top-left-radius: ${({ isMyMessage }) => (isMyMessage ? '0' : '20px')};
  border-top-right-radius: ${({ isMyMessage }) => (isMyMessage ? '20px' : '0')};
`
