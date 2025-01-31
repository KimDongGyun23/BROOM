import { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalWithOneButton } from '@/components/view/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { useBoolean } from '@/hooks/useBoolean'
import { useBusForm } from '@/hooks/useForm'
import { useBusReservationMutation } from '@/services/query/useBusQuery'
import type { BusReservationForm } from '@/types/bus'
import { FORM_ATTRIBUTE } from '@/utils/schema'

const ReservationForm = () => (
  <StyledForm>
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
  </StyledForm>
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
    <Container>
      <SubHeaderWithoutIcon type="null" onClickCancel={handleCancel} />
      <Title>예약 정보 입력</Title>

      <FormProvider {...formMethod}>
        <ReservationForm />
      </FormProvider>

      <StyledButton size="lg" className="mx-4 mb-10 mt-2" onClick={handleSubmit(handleReservation)}>
        예약하기
      </StyledButton>

      <ModalWithOneButton
        isOpen={isModalOpen}
        onClose={closeModal}
        content="성공적으로 예약되었습니다."
        button={{ onClick: handleModalClose, label: '완료' }}
      />
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column')};
  height: 100%;
`

const Title = styled.h4`
  ${({ theme }) => theme.margin('xl', 'container', 'page-label-bottom')};
  ${({ theme }) => theme.font(400, theme.colors.black[600])};
`

const StyledForm = styled.form`
  flex-grow: 1;
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '2xl')};
  ${({ theme }) => theme.margin(0, 'container', 'xs')};
  overflow-y: scroll;
`

const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('xs', 'container', 'xl')};
`
