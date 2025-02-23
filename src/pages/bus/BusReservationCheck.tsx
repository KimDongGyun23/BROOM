import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { BusReservationCheckForm } from '@/features/bus/ui/BusReservationCheckForm'
import { SubHeaderWithoutIcon } from '@/shared/ui/SubHeader'

export const BusReservationCheck = () => {
  const navigate = useNavigate()
  const handleClose = () => navigate(-1)

  return (
    <>
      <SubHeaderWithoutIcon type="null" onClickCancel={handleClose} />
      <Container>
        <Title>예약 내역 조회</Title>
        <BusReservationCheckForm />
        <NoticeContainer>
          <p className="notice-text">개인 정보 보호를 위해 신청 여부만 확인 가능합니다.</p>
          <p className="notice-text">기타 문의사항이 있다면 공지사항의 연락수단을 확인해주세요.</p>
        </NoticeContainer>
      </Container>
    </>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.margin(0, 'container')};
`

const Title = styled.h4`
  ${({ theme }) => theme.margin('xl', 0, 'page-label-bottom')};
  ${({ theme }) => theme.font(400, theme.colors.black[600])};
`

const NoticeContainer = styled.div`
  ${({ theme }) => theme.flexBox('column')};

  .notice-text {
    ${({ theme }) => theme.font(900, theme.colors.black[300])}
  }
`
