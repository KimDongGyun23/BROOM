import { styled } from 'styled-components'

import { signupAttribute } from '@/entities/auth/config/auth.schema'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

import { useIdUniqueState } from '../../check-duplication/model/duplication.store'
import { IdDuplicationCheckField } from '../../check-duplication/ui/IdDuplicationCheckField'
import { useMoveToSecondStep } from '../model/useMoveToSecondStep'

export const SignupOneStep = () => {
  const isIdUnique = useIdUniqueState()

  const { handleNextStep } = useMoveToSecondStep()

  const { ID, PASSWORD, CONFIRM } = signupAttribute

  return (
    <>
      <IdDuplicationCheckField {...ID} />

      <InputGroup section={PASSWORD.section}>
        <InputGroup.Label label={PASSWORD.label} />
        <InputGroup.PasswordInput {...PASSWORD.input} />
      </InputGroup>

      <InputGroup section={CONFIRM.section}>
        <InputGroup.Label label={CONFIRM.label} />
        <InputGroup.PasswordInput {...CONFIRM.input} />
      </InputGroup>

      <StyledButton size="lg" onClick={handleNextStep} disabled={!isIdUnique}>
        다음으로
      </StyledButton>
    </>
  )
}

const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('auto', 0, '4xl')};
`
