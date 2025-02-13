import { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@/components/view/Button'
import { InputGroup } from '@/components/view/inputGroup'
import { ModalWithOneButton } from '@/components/view/Modal'
import { SubHeaderWithoutIcon } from '@/components/view/SubHeader'
import { busCreateAttribute, useBusCreateForm } from '@/forms/useBusCreateForm'
import { ModalStoreProvider, useModalActions, useModalState } from '@/stores/modal'
import { Container } from '@/styles/commonStyles'

const ReserveCreateModal = () => {
  const navigate = useNavigate()
  const { isModalOpen, label } = useModalState()
  const { closeModal } = useModalActions()

  const handleModalClose = useCallback(() => {
    closeModal()
    navigate(-1)
  }, [closeModal, navigate])

  return (
    <ModalWithOneButton
      isOpen={isModalOpen}
      onClose={closeModal}
      content={label}
      button={{ onClick: handleModalClose, label: '완료' }}
    />
  )
}

export const ReserveCreate = () => {
  const navigate = useNavigate()
  const { formMethod, onSubmit } = useBusCreateForm()

  const { NAME, STUDENT_ID, PHONE_NUMBER } = busCreateAttribute
  const handleCancel = useCallback(() => navigate(-1), [navigate])

  return (
    <ModalStoreProvider>
      <Container>
        <SubHeaderWithoutIcon type="null" onClickCancel={handleCancel} />
        <Title>예약 정보 입력</Title>

        <FormProvider {...formMethod}>
          <StyledForm>
            <InputGroup section={NAME.section}>
              <InputGroup.Label label={NAME.label} />
              <InputGroup.Input {...NAME.input} />
            </InputGroup>

            <InputGroup section={STUDENT_ID.section}>
              <InputGroup.Label label={STUDENT_ID.label} />
              <InputGroup.Input {...STUDENT_ID.input} />
            </InputGroup>

            <InputGroup section={PHONE_NUMBER.section}>
              <InputGroup.Label label={PHONE_NUMBER.label} />
              <InputGroup.Input {...PHONE_NUMBER.input} />
            </InputGroup>
          </StyledForm>
        </FormProvider>

        <StyledButton size="lg" className="mx-4 mb-10 mt-2" onClick={onSubmit}>
          예약하기
        </StyledButton>

        <ReserveCreateModal />
      </Container>
    </ModalStoreProvider>
  )
}

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
