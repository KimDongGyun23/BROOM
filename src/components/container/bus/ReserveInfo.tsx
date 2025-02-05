import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBusReservedInfoForm } from '@/hooks/useForm'
import { useBusReservationStatus } from '@/services/service/useBusReservationStatus'
import { BUS_RESERVATION_STATES, type BusReservationState } from '@/utils/constants'
import { FORM_ATTRIBUTE } from '@/utils/schema'

type ReservationFormType = {
  onSubmit: VoidFunction
}

const ReservationForm = ({ onSubmit }: ReservationFormType) => {
  const formMethod = useBusReservedInfoForm()
  const { handleSubmit } = formMethod

  return (
    <FormProvider {...formMethod}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup section={FORM_ATTRIBUTE.STUDENT_ID.section}>
          <InputGroup.Label label={FORM_ATTRIBUTE.STUDENT_ID.label} />
          <InputContainer>
            <InputGroup.Input {...FORM_ATTRIBUTE.STUDENT_ID.input} />
            <Button size="md" type="submit">
              조회하기
            </Button>
          </InputContainer>
        </InputGroup>
      </form>
    </FormProvider>
  )
}

export const ReserveInfo = () => {
  const navigate = useNavigate()
  const formMethod = useBusReservedInfoForm()
  const { reset, watch } = formMethod

  const studentId = watch(FORM_ATTRIBUTE.STUDENT_ID.section)
  const { reservationState, checkReservation } = useBusReservationStatus(studentId)

  const handleClose = () => {
    reset()
    navigate(-1)
  }

  return (
    <>
      <SubHeaderWithoutIcon type="null" onClickCancel={handleClose} />
      <Container>
        <Title>예약 내역 조회</Title>
        <ReservationForm onSubmit={checkReservation} />

        <ReservationStateGrid>
          <p className="reservation-state-label">신청 여부</p>
          <ReservationStateValue $state={reservationState}>
            {reservationState}
          </ReservationStateValue>
        </ReservationStateGrid>

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

const InputContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
`

const ReservationStateGrid = styled.div`
  ${({ theme }) => theme.gridBox('1fr 1fr')};
  ${({ theme }) => theme.margin('4xl', 0, 'xl')};
  ${({ theme }) => theme.border('divider', 'top', 'bottom')};
  text-align: center;

  .reservation-state-label {
    ${({ theme }) => theme.padding('md', 'lg')};
    color: ${({ theme }) => theme.colors.black[600]};
  }
`

const ReservationStateValue = styled.p<{ $state: BusReservationState }>`
  ${({ theme }) => theme.padding('md', 'lg')};
  color: ${({ theme, $state }) => {
    switch ($state) {
      case BUS_RESERVATION_STATES.COMPLETED:
        return theme.colors.blue[500]
      case BUS_RESERVATION_STATES.NOT_FOUND:
        return theme.colors.error
      case BUS_RESERVATION_STATES.PENDING:
        return theme.colors.black[400]
      default:
        return theme.colors.black[400]
    }
  }};
`

const NoticeContainer = styled.div`
  ${({ theme }) => theme.flexBox('column')};

  .notice-text {
    ${({ theme }) => theme.font(900, theme.colors.black[300])}
  }
`
