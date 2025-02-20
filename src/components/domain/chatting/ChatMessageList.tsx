import InfiniteScroll from 'react-infinite-scroller'
import styled, { css } from 'styled-components'

import { ProfileImage } from '@/components/view/ProfileImage'
import { useParamId } from '@/hooks/useParamId'
import { useScrollToBottom } from '@/hooks/useScrollToBottom'
import { useFetchChatRoomInformation } from '@/query/useChattingQuery'
import { useChatMessages } from '@/stores/chatMessage'
import type { MessageType } from '@/types/chatting'
import { getSessionStorageItem, SESSION_KEYS } from '@/utils/storage'

const ChatMessage = ({ messageData }: { messageData: MessageType }) => {
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

{
  /* <InfiniteScroll
        hasMore={hasNextPage}
        threshold={200}
        loadMore={() => fetchNextPage()}
        useWindow={false}
      >
        {postList.map((item) => (
          <PostItem key={item.status.boardId} item={item} />
        ))}
      </InfiniteScroll> */
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
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
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
