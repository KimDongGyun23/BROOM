import { FlexColumnContainer } from '@/app/style/commonStyles'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'
import { ChatList } from '@/widgets/list/ChatList'

export const Chat = () => {
  return (
    <FlexColumnContainer>
      <MainHeader secondary title="채팅" />
      <ChatList />
      <BottomNavigation />
    </FlexColumnContainer>
  )
}
