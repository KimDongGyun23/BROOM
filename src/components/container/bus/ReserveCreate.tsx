import { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view/Button'
import { SubHeaderWithoutIcon } from '@/components/view/header/SubHeader'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalWithOneButton } from '@/components/view/Modal'
import { useBoolean, useBusForm } from '@/hooks'
import { useBusReservationMutation } from '@/services/query/useBusQuery'
import type { BusReservationForm } from '@/types/bus'
import { FORM_ATTRIBUTE } from '@/utils/constants'

const ReservationForm = () => (
  <form className="flex-column scroll mx-4 mb-2 grow gap-7">
    <InputGroup section={FORM_ATTRIBUTE.NAME.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.NAME.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.NAME.input} />
    </InputGroup>

    <InputGroup section={FORM_ATTRIBUTE.STUDENT_ID.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.STUDENT_ID.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.STUDENT_ID.input} />
    </InputGroup>

    <InputGroup section={FORM_ATTRIBUTE.PHONE_NUMBER.section}>
      <InputGroup.Label label={FORM_ATTRIBUTE.PHONE_NUMBER.label} />
      <InputGroup.Input {...FORM_ATTRIBUTE.PHONE_NUMBER.input} />
    </InputGroup>
  </form>
)

export const ReserveCreate = () => {
  const formMethod = useBusForm()
  const navigate = useNavigate()
  const { handleSubmit, reset } = formMethod

  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const { mutate: reserveBus } = useBusReservationMutation()

  const handleCancel = useCallback(() => {
    reset()
    navigate(-1)
  }, [reset, navigate])

  const handleReservation = useCallback(
    (formData: BusReservationForm) => {
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
      <SubHeaderWithoutIcon type="null" onClickCancel={handleCancel} />
      <h2 className="mx-4 mb-[65px] mt-6 font-bold text-grey-700">예약 정보 입력</h2>

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
