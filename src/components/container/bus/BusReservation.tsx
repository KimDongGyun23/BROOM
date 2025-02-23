import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from '@/app/style/commonStyles'
import { BusReservationNotice } from '@/components/domain/bus/BusReservationNotice'
import { BottomNavigation } from '@/components/view/BottomNavigation'
import { Button } from '@/components/view/Button'
import { MainHeader } from '@/components/view/MainHeader'

export const BusReservation = () => {
  const navigate = useNavigate()

  const handleReserveClick = () => navigate('/bus-reserve/create')
  const handleCheckClick = () => navigate('/bus-reserve/info')

  return (
    <Container>
      <MainHeader />

      <MainContent>
        <h5 className="main-title">현재 버스 예약 접수 중입니다.</h5>
        <BusReservationNotice />

        <ButtonContainer>
          <Button size="md" onClick={handleReserveClick}>
            예약하러 가기
          </Button>
          <Button size="md" secondary onClick={handleCheckClick}>
            예약 내역 조회하기
          </Button>
        </ButtonContainer>
      </MainContent>

      <BottomNavigation />
    </Container>
  )
}

const MainContent = styled.main`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '2xl')};
  ${({ theme }) => theme.margin(0, 'container')};
  ${({ theme }) => theme.padding(0, 0, '3xl', 0)};
  flex-grow: 1;
  overflow-y: scroll;

  .main-title {
    ${({ theme }) => theme.font(500, theme.colors.blue[500])};
  }
`

const ButtonContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'md')};
`
