import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, InputGroup, SubHeaderWithoutIcon } from '@/components/view'
import { useBusReserveInfoForm } from '@/hooks'
import { useBusReservationStatus } from '@/services/service'
import { BUS_RESERVATION_STATES } from '@/utils'

const STATE_STYLES = {
  [BUS_RESERVATION_STATES.COMPLETED]: 'text-blue-5',
  [BUS_RESERVATION_STATES.NOT_FOUND]: 'text-red-2',
  [BUS_RESERVATION_STATES.PENDING]: 'text-grey-5',
} as const

type ReservationFormType = {
  onSubmit: VoidFunction
}

const ReservationForm = ({ onSubmit }: ReservationFormType) => {
  const formMethod = useBusReserveInfoForm()
  const { handleSubmit } = formMethod

  return (
    <FormProvider {...formMethod}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputGroup.Label section="studentId">학번</InputGroup.Label>
          <div className="flex gap-4">
            <InputGroup.Input section="studentId" placeholder="학번을 입력해주세요." />
            <Button size="md" type="submit">
              조회하기
            </Button>
          </div>
        </InputGroup>
      </form>
    </FormProvider>
  )
}

export const ReserveInfo = () => {
  const navigate = useNavigate()
  const formMethod = useBusReserveInfoForm()
  const { reset, watch } = formMethod

  const studentId = watch('studentId')
  const { reservationState, checkReservation } = useBusReservationStatus(studentId)

  const handleClose = () => {
    reset()
    navigate(-1)
  }

  return (
    <>
      <SubHeaderWithoutIcon type="null" onClickCancle={handleClose} />
      <div className="mx-4">
        <h4 className="mb-[65px] mt-6 font-bold text-grey-7">예약 내역 조회</h4>
        <ReservationForm onSubmit={checkReservation} />

        <div className="mt-5 grid grid-cols-2 border-y border-y-grey-2 text-center">
          <p className="px-4 py-[10px] text-grey-7">신청 여부</p>
          <p className={`px-4 py-[10px] font-medium ${STATE_STYLES[reservationState]}`}>
            {reservationState}
          </p>
        </div>

        <div className="flex-column mt-5">
          <p className="p-xsmall text-grey-5">개인 정보 보호를 위해 신청 여부만 확인 가능합니다.</p>
          <p className="p-xsmall text-grey-5">
            기타 문의사항이 있다면 공지사항의 연락수단을 확인해주세요.
          </p>
        </div>
      </div>
    </>
  )
}
