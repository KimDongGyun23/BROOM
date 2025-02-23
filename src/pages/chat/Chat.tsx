import { FlexColumnContainer } from '@/app/style/commonStyles'
import { ChatList } from '@/features/chat/ui/ChatList'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'

export const Chat = () => {
  return (
    <FlexColumnContainer>
      <MainHeader secondary title="채팅" />
      <ChatList />
      <BottomNavigation />
    </FlexColumnContainer>
  )
}
