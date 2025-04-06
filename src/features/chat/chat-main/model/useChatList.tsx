import { useFetchChatRoomList } from '@/entities/chat/api/useChat.query'

export const useChatList = () => {
  const { data, isError } = useFetchChatRoomList()

  const chatRoomList = data?.pages.flatMap((page) => page.chatRooms) || []

  return { chatRoomList, isError }
}
