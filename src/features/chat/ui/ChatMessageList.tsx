import InfiniteScroll from 'react-infinite-scroller'
import styled, { css } from 'styled-components'

import { useChatMessages } from '@/features/chat/model/chatMessage.store'
import { useParamId } from '@/shared/hook/useParamId'
import { useScrollToBottom } from '@/shared/hook/useScrollToBottom'
import { getSessionStorageItem, SESSION_KEYS } from '@/shared/lib/storage'
import { ProfileImage } from '@/shared/ui/ProfileImage'

import { useFetchChatRoomInformation } from '../api/useChat.query'
import type { Message } from '../model/chat.type'

const ChatMessage = ({ messageData }: { messageData: Message }) => {
  const myNickname = getSessionStorageItem(SESSION_KEYS.NICKNAME)
  const { militaryBranch, senderNickname, message, createdAt } = messageData

  const isMyMessage = senderNickname === myNickname

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
  const scrollRef = useScrollToBottom(messageList)

  const { hasNextPage, fetchNextPage } = useFetchChatRoomInformation({ urls: { boardId } })

  return (
    <Container ref={scrollRef}>
      <InfiniteScroll
        hasMore={hasNextPage}
        threshold={200}
        loadMore={() => fetchNextPage()}
        useWindow={false}
        isReverse
      >
        {messageList?.map((message) => (
          <ChatMessage key={message.messageId} messageData={message} />
        ))}
      </InfiniteScroll>
    </Container>
  )
}

const Container = styled.main`
  ${({ theme }) => theme.flexBox('column-reverse', undefined, undefined, 'lg')};
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding('lg', 0)};
  flex-grow: 1;
  overflow-y: scroll;
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
