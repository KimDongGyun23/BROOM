import { Container } from '@/app/style/commonStyles'
import { ChatList } from '@/components/domain/chatting/ChatList'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'

export const Chat = () => {
  return (
    <Container>
      <MainHeader />
      <ChatList />
      <BottomNavigation />
    </Container>
  )
}
