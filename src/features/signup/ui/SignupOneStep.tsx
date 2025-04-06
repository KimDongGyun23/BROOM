import { styled } from 'styled-components'

import { signupAttribute } from '@/entities/auth/config/auth.schema'
import { useIdUniqueState } from '@/features/check-duplication/model/duplication.store'
import { IdDuplicationCheckField } from '@/features/check-duplication/ui/IdDuplicationCheckField'
import { useSignupOneStepNext } from '@/features/signup/model/useSignupOneStepNext'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

export const SignupOneStep = () => {
  const { ID, PASSWORD, CONFIRM } = signupAttribute

  const isIdUnique = useIdUniqueState()

  const { handleNextStep } = useSignupOneStepNext()

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
