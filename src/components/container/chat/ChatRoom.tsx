import { ChatMessageList } from '@/components/domain/chatting/ChattingMessageList'
import { ChattingRoomProfile } from '@/components/domain/chatting/ChattingRoomProfile'
import { Loading } from '@/components/view/Loading'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { useParamId } from '@/hooks/useParamId'
import { useFetchChatRoomInformation } from '@/query/useChattingQuery'
import { useChatMessageActions } from '@/stores/chatMessage'
import { Container } from '@/styles/commonStyles'

import { ErrorPage } from '../home/ErrorPage'

export const ChatRoom = () => {
  const boardId = useParamId()
  const { setInitialMessage } = useChatMessageActions()

  const {
    data: roomInformation,
    isPending,
    isError,
  } = useFetchChatRoomInformation({ urls: { boardId } })

  if (isPending) return <Loading />
  if (isError || !roomInformation) return <ErrorPage />

  if (roomInformation) setInitialMessage(roomInformation.messages)

  const { militaryBranches, ownerNickname, boardTitle } = roomInformation

  return (
    <Container>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={() => {}} />
      <ChattingRoomProfile
        profileIconList={militaryBranches}
        ownerNickname={ownerNickname}
        title={boardTitle}
      />

      <ChatMessageList />
      {/* <MessageBox /> */}
    </Container>
  )
}
