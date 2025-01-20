import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBusReservedInfoForm } from '@/hooks/useForm'
import { useBusReservationStatus } from '@/services/service/useBusReservationStatus'
import type { BusReservationState } from '@/utils/constants'
import { BUS_RESERVATION_STATES, FORM_ATTRIBUTE } from '@/utils/constants'

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
  margin: 0 ${({ theme }) => theme.gap.xl};
`

const Title = styled.h4`
  margin: 24px 0 65px;
  font-size: ${({ theme }) => theme.fontSize[400]};
  line-height: ${({ theme }) => theme.lineHeight[400]};
  color: ${({ theme }) => theme.colors.black[600]};
`

const InputContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap.xl};
`

const ReservationStateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: ${({ theme }) => theme.gap.xxl};
  border-top: 1px solid ${({ theme }) => theme.colors.black[200]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[200]};
  text-align: center;

  .reservation-state-label {
    padding: 10px ${({ theme }) => `${theme.gap.xl}`};
    color: ${({ theme }) => theme.colors.black[600]};
  }
`

const ReservationStateValue = styled.p<{ $state: BusReservationState }>`
  padding: 10px ${({ theme }) => `${theme.gap.xl}`};
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
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.gap.xxl};

  .notice-text {
    font-size: ${({ theme }) => theme.fontSize[900]};
    line-height: ${({ theme }) => theme.lineHeight[900]};
    color: ${({ theme }) => theme.colors.black[500]};
  }
`
