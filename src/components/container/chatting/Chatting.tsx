import { CarpoolChattingList } from '@/components/domain/chatting/CarpoolChattingList'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { MainHeader } from '@/components/view/MainHeader'
import { Container } from '@/styles/commonStyles'

export const Chatting = () => {
  return (
    <Container>
      <MainHeader />
      <CarpoolChattingList />
      <BottomNavigation />
    </Container>
  )
}
