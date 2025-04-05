import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { HomeDeadlinePostSection } from '@/features/home/ui/HomeDeadlinePostSection'
import { HomeServiceSection } from '@/features/home/ui/HomeServiceSection'
import { HomeUserSection } from '@/features/home/ui/HomeUserSection'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'

export const Home = () => {
  return (
    <Container>
      <MainHeader />
      <MainContent>
        <HomeUserSection />
        <HomeServiceSection />
        <HomeDeadlinePostSection />
      </MainContent>
      <BottomNavigation />
    </Container>
  )
}

const MainContent = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'sm')}
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.black[100]};
  overflow-y: scroll;
`
