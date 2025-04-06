import { FlexColumnContainer } from '@/app/style/commonStyles'
import { ChatRoomList } from '@/features/chat/chat-main/ui/ChatRoomList'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'

export const Chat = () => {
  return (
    <FlexColumnContainer>
      <MainHeader secondary title="채팅" />
      <ChatRoomList />
      <BottomNavigation />
    </FlexColumnContainer>
  )
}
