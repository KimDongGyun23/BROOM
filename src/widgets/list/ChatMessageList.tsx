import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'

import { useFetchChatRoomInformation } from '@/entities/chat/api/useChat.query'
import { useChatMessages } from '@/entities/chat/model/chatMessage.store'
import { useParamId } from '@/shared/hook/useParamId'

import { ChatMessageItem } from './item/ChatMessageItem'

export const ChatMessageList = () => {
  const boardId = useParamId()
  const messageList = useChatMessages()

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
      </InfiniteScrollContainer>
    </ChatContainer>
  )
}

const ChatContainer = styled.main`
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
