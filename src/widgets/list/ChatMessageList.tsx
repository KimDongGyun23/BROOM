import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'

import { useFetchChatRoomInformation } from '@/entities/chat/api/useChat.query'
import { useScrollToBottom } from '@/entities/chat/hook/useScrollToBottom'
import { useChatMessages } from '@/entities/chat/model/chatMessage.store'
import { useParamId } from '@/shared/hook/useParamId'
import { ArrowFatLinesDownIcon } from '@/shared/ui/icons/NonActiveIcons'

import { ChatMessageItem } from './item/ChatMessageItem'

export const ChatMessageList = () => {
  const boardId = useParamId()
  const messageList = useChatMessages()

  const { showScrollButton, handleScrollToBottom, chatListRef } = useScrollToBottom()

  const { hasNextPage, fetchNextPage } = useFetchChatRoomInformation({ urls: { boardId } })

  return (
    <ChatContainer>
      <InfiniteScrollContainer
        hasMore={hasNextPage}
        threshold={200}
        loadMore={() => fetchNextPage()}
        useWindow={false}
        isReverse
      >
        {messageList?.map((message) => (
          <ChatMessageItem key={message.messageId} messageData={message} />
        ))}
        <RefSection ref={chatListRef} />
      </InfiniteScrollContainer>

      {showScrollButton && (
        <ArrowDownButton onClick={handleScrollToBottom}>
          <ArrowFatLinesDownIcon />
        </ArrowDownButton>
      )}
    </ChatContainer>
  )
}

const ChatContainer = styled.main`
  ${({ theme }) => `
    ${theme.flexBox('column-reverse')}
    ${theme.margin(0, 'container')}
    ${theme.padding('lg', 0)}
  `}
  position: relative;
  flex-grow: 1;
  overflow-y: scroll;
`

const InfiniteScrollContainer = styled(InfiniteScroll)`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')}
`

const RefSection = styled.div`
  margin-top: -16px;
`

const ArrowDownButton = styled.button`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center', 'center')}
    ${theme.padding('xs')}
    ${theme.borderRadius('full')}
    ${theme.border('chat-down-button')}
    background-color: ${theme.colors.black[100]};
  `}
  position: absolute;
  opacity: 80%;
  bottom: 12px;
  right: 12px;
`
