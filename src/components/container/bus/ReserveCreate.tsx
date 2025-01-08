import { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { InputGroup, SubHeaderWithoutIcon } from '@/components/view'
import { Button } from '@/components/view/Button'
import { ModalWithOneButton } from '@/components/view/modal/Modal'
import { useBoolean, useBusForm } from '@/hooks'
import { useBusReserve } from '@/services/query'
import type { BusFormType } from '@/types'

const ReservationForm = () => (
  <form className="flex-column scroll mx-4 mb-2 grow gap-7">
    <InputGroup>
      <InputGroup.Label section="name">이름</InputGroup.Label>
      <InputGroup.Input section="name" placeholder="이름을 입력해주세요." />
    </InputGroup>

    <InputGroup>
      <InputGroup.Label section="studentId">학번</InputGroup.Label>
      <InputGroup.Input section="studentId" type="number" placeholder="학번을 입력해주세요." />
    </InputGroup>

    <InputGroup>
      <InputGroup.Label section="phoneNumber">연락처</InputGroup.Label>
      <InputGroup.Input
        section="phoneNumber"
        type="number"
        placeholder="-를 제외한 숫자만 입력해주세요."
      />
    </InputGroup>
  </form>
)

export const ReserveCreate = () => {
  const formMethod = useBusForm()
  const navigate = useNavigate()
  const { handleSubmit, reset } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const { mutate: reserveBus } = useBusReserve()

  const handleCancel = useCallback(() => {
    reset()
    navigate(-1)
  }, [reset, navigate])

  const handleReservation = useCallback(
    (formData: BusFormType) => {
      reserveBus({ body: formData }, { onSuccess: openModal })
    },
    [reserveBus, openModal],
  )

  const handleModalClose = useCallback(() => {
    reset()
    closeModal()
    navigate(-1)
  }, [reset, closeModal, navigate])

  return (
    <div className="flex-column h-svh">
      <SubHeaderWithoutIcon type="null" onClickCancle={handleCancel} />
      <h4 className="mx-4 mb-[65px] mt-6 font-bold text-grey-700">예약 정보 입력</h4>

      <FormProvider {...formMethod}>
        <ReservationForm />
      </FormProvider>

      <Button size="lg" className="mx-4 mb-10 mt-2" onClick={handleSubmit(handleReservation)}>
        예약하기
      </Button>

      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content="성공적으로 예약되었습니다."
        button={{ onClick: handleModalClose, label: '완료' }}
      />
    </div>
  )
}
