import { ChatMessageList } from '@/components/domain/chatting/ChattingMessageList'
import { SubHeaderWithIcon } from '@/components/view/SubHeader'
import { Container } from '@/styles/commonStyles'

export const ChatRoom = () => {
  // const { id: roomId } = useParams()
  // const [isKebabOpen, openKebab, closeKebab] = useBoolean(false)
  // const { setInitialMessage } = useChatMessageActions()

  // const {
  //   data: carpoolRoomData,
  //   isPending,
  //   isError,
  // } = useCarpoolChattingInfo({
  //   urls: { chatRoomId: roomId as string },
  // })

  // if (isPending) return <Loading />
  // if (isError) return <div>error</div>

  return (
    <Container>
      <SubHeaderWithIcon type={'kebab'} onClickKebab={() => {}} />
      {/* <ChattingRoomProfile
        profileIconList={carpoolRoomData.militaryBranches}
        ownerNickname={carpoolRoomData.ownerNickname}
        title={carpoolRoomData.boardName}
      /> */}

      <ChatMessageList />
      {/* <MessageBox /> */}
    </Container>
  )
}
