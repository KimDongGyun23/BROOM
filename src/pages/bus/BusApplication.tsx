import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { Button } from '@/shared/ui/Button'
import { MainHeader } from '@/shared/ui/MainHeader'
import { BusNoticeSection } from '@/widgets/section/BusNoticeSection'

export const BusApplication = () => {
  const handleClickButton = () => (window.location.href = 'https://www.google.com')

  return (
    <Container>
      <MainHeader secondary title="버스 신청" />

      <MainContent>
        <BusNoticeSection />

        <ButtonContainer>
          <Button size="md" onClick={handleClickButton}>
            신청하러 가기
          </Button>
        </ButtonContainer>
      </MainContent>

      <BottomNavigation />
    </Container>
  )
}

const MainContent = styled.main`
  ${({ theme }) => theme.margin(0, 'container')}
  ${({ theme }) => theme.padding('lg', 0)}
  flex-grow: 1;
  overflow-y: scroll;
`

const ButtonContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'md')}
    ${theme.margin('xl', 0, 0)}
  `}
`
