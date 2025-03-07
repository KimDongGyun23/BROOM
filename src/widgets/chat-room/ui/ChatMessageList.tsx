import InfiniteScroll from 'react-infinite-scroller'
import styled, { css } from 'styled-components'

import { useFetchChatRoomInformation } from '@/entities/chat/api/useChat.query'
import type { Message } from '@/entities/chat/model/chat.type'
import { useChatMessages } from '@/entities/chat/model/chatMessage.store'
import { useUserData } from '@/features/login/model/auth.store'
import { useParamId } from '@/shared/hook/useParamId'
import { ProfileImage } from '@/shared/ui/ProfileImage'

const ChatMessage = ({ messageData }: { messageData: Message }) => {
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

export const ChatMessageList = () => {
  const boardId = useParamId()
  const messageList = useChatMessages()

  const { hasNextPage, fetchNextPage } = useFetchChatRoomInformation({ urls: { boardId } })

  return (
    <Container>
      <InfiniteScrollContainer
        hasMore={hasNextPage}
        threshold={200}
        loadMore={() => fetchNextPage()}
        useWindow={false}
        isReverse
      >
        {messageList?.map((message) => (
          <ChatMessage key={message.messageId} messageData={message} />
        ))}
      </InfiniteScrollContainer>
    </Container>
  )
}

const Container = styled.main`
  ${({ theme }) => `
    ${theme.flexBox('column-reverse')}
    ${theme.margin(0, 'container')}
    ${theme.padding('lg', 0)}
  `}
  flex-grow: 1;
  overflow-y: scroll;
`

const InfiniteScrollContainer = styled(InfiniteScroll)`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')}
`

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
