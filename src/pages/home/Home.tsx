import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'
import { HomeNoticeSection } from '@/widgets/home-service/ui/HomeNoticeSection'
import { HomeServiceSection } from '@/widgets/home-service/ui/HomeServiceSection'
import { HomeUserSection } from '@/widgets/home-service/ui/HomeUserSection'

export const Home = () => {
  return (
    <Container>
      <MainHeader />
      <Main>
        <HomeUserSection />
        <HomeNoticeSection />
        <HomeServiceSection />
      </Main>

      <BottomNavigation />
    </Container>
  )
}

const Main = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'sm')}
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.black[100]};
  overflow-y: scroll;
`
