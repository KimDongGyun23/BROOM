import { styled } from 'styled-components'

import { FormContainer } from '@/app/style/commonStyles'
import { busReserveInfoAttribute } from '@/entities/bus/config/bus.schema'
import { CheckBusApplicationButton } from '@/features/check-bus-application/ui/CheckBusApplicationButton'
import { InputGroup } from '@/shared/ui/inputGroup'

export const BusApplicationStatusForm = () => {
  const { STUDENT_ID } = busReserveInfoAttribute

  return (
    <FormContainer>
      <InputGroup section={STUDENT_ID.section}>
        <InputGroup.Label label={STUDENT_ID.label} />
        <InputContainer>
          <InputGroup.NumberInput {...STUDENT_ID.input} />
          <CheckBusApplicationButton />
        </InputContainer>
      </InputGroup>
    </FormContainer>
  )
}

const InputContainer = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'lg')};
`
