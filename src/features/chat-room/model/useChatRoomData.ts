import { useFetchChatRoomInformation } from '@/entities/chat/api/useChat.query'
import { useChatMessageActions } from '@/entities/chat/model/chatMessage.store'
import { useParamId } from '@/shared/hook/useParamId'

export const useChatRoomData = () => {
  const boardId = useParamId()

  const { setInitialMessage } = useChatMessageActions()

  const { data: roomInformation } = useFetchChatRoomInformation({ urls: { boardId } })

  if (roomInformation) {
    const { militaryBranches, ownerNickname, boardTitle, messages } = roomInformation
    setInitialMessage(messages)

    return {
      militaryBranches,
      ownerNickname,
      boardTitle,
    }
  }

  return {
    militaryBranches: [],
    ownerNickname: '',
    boardTitle: '',
  }
}
