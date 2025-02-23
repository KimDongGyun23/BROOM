import { FormProvider } from 'react-hook-form'
import { styled } from 'styled-components'

import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'
import { busCreateAttribute, useBusCreateForm } from '@/forms/useBusCreateForm'

export const BusReservationCreateForm = () => {
  const { formMethod, onSubmit } = useBusCreateForm()
  const { NAME, STUDENT_ID, PHONE_NUMBER } = busCreateAttribute

  return (
    <>
      <FormProvider {...formMethod}>
        <StyledForm>
          <InputGroup section={NAME.section}>
            <InputGroup.Label label={NAME.label} />
            <InputGroup.Input {...NAME.input} />
          </InputGroup>

          <InputGroup section={STUDENT_ID.section}>
            <InputGroup.Label label={STUDENT_ID.label} />
            <InputGroup.NumberInput {...STUDENT_ID.input} />
          </InputGroup>

          <InputGroup section={PHONE_NUMBER.section}>
            <InputGroup.Label label={PHONE_NUMBER.label} />
            <InputGroup.NumberInput {...PHONE_NUMBER.input} />
          </InputGroup>
        </StyledForm>
      </FormProvider>

      <StyledButton size="lg" className="mx-4 mb-10 mt-2" onClick={onSubmit}>
        예약하기
      </StyledButton>
    </>
  )
}

const StyledForm = styled.form`
  flex-grow: 1;
  ${({ theme }) => theme.flexBox('column', undefined, undefined, '2xl')};
  ${({ theme }) => theme.margin(0, 'container', 'xs')};
  overflow-y: scroll;
`

const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('xs', 'container', 'xl')};
`
