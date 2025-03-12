import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { MainHeader } from '@/shared/ui/MainHeader'
import { HomeNoticeSection } from '@/widgets/section/HomeNoticeSection'
import { HomeServiceSection } from '@/widgets/section/HomeServiceSection'
import { HomeUserSection } from '@/widgets/section/HomeUserSection'

export const Home = () => {
  return (
    <Container>
      <MainHeader />
      <MainContent>
        <HomeUserSection />
        <HomeNoticeSection />
        <HomeServiceSection />
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
