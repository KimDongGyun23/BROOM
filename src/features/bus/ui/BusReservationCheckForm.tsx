import { FormProvider } from 'react-hook-form'
import { styled } from 'styled-components'

import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

import type { BusReservationState } from '../config/bus.constant'
import { BUS_RESERVATION_STATES } from '../config/bus.constant'
import { busReserveInfoAttribute } from '../config/bus.schema'
import { useBusReserveInfoForm } from '../hook/useBusReserveInfoForm'

export const BusReservationCheckForm = () => {
  const { STUDENT_ID } = busReserveInfoAttribute
  const { reservationStatus, formMethod, onSubmit } = useBusReserveInfoForm()

  return (
    <>
      <FormProvider {...formMethod}>
        <form onSubmit={onSubmit}>
          <InputGroup section={STUDENT_ID.section}>
            <InputGroup.Label label={STUDENT_ID.label} />
            <InputContainer>
              <InputGroup.NumberInput {...STUDENT_ID.input} />
              <Button size="md" type="submit">
                조회하기
              </Button>
            </InputContainer>
          </InputGroup>
        </form>
      </FormProvider>

      <ReservationStateGrid>
        <p className="reservation-state-label">신청 여부</p>
        <ReservationStateValue $state={reservationStatus}>
          {reservationStatus}
        </ReservationStateValue>
      </ReservationStateGrid>
    </>
  )
}

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
