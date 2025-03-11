import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { BottomNavigation } from '@/shared/ui/BottomNavigation'
import { Button } from '@/shared/ui/Button'
import { MainHeader } from '@/shared/ui/MainHeader'
import { BusNoticeSection } from '@/widgets/section/BusNoticeSection'

export const BusApplication = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <MainHeader title="버스 신청" />

      <MainContent>
        <BusNoticeSection />

        <ButtonContainer>
          <Button size="md" onClick={() => navigate('/bus-application/create')}>
            예약하러 가기
          </Button>
          <Button size="md" secondary onClick={() => navigate('/bus-application/status')}>
            예약 내역 조회하기
          </Button>
        </ButtonContainer>
      </MainContent>

      <BottomNavigation />
    </Container>
  )
}

const MainContent = styled.main`
  ${({ theme }) => theme.margin('container')}
  flex-grow: 1;
  overflow-y: scroll;
`

const ButtonContainer = styled.div`
  ${({ theme }) => `
    ${theme.flexBox('column', undefined, undefined, 'md')}
    ${theme.margin('xl', 0, 0)}
  `}
`
