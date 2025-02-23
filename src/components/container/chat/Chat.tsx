import { Container } from '@/app/style/commonStyles'
import { ChatList } from '@/components/domain/chatting/ChatList'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'

export const Chat = () => {
  return (
    <Container>
      <MainHeader />
      <ChatList />
      <BottomNavigation />
    </Container>
  )
}
