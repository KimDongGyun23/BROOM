import { styled } from 'styled-components'

import { signupAttribute } from '@/entities/auth/config/auth.schema'
import { Button } from '@/shared/ui/Button'
import { InputGroup } from '@/shared/ui/inputGroup'

import { useNicknameUniqueState } from '../../check-duplication/model/duplication.store'
import { NicknameDuplicationCheckField } from '../../check-duplication/ui/NicknameDuplicationCheckField'

export const SignupTwoStep = () => {
  const isNicknameUnique = useNicknameUniqueState()

  const { handleNextStep } = useSignupTwoStepNext()

  const { NICKNAME, DISCHARGE_YEAR, MILITARY_BRANCH } = signupAttribute

  return (
    <>
      <NicknameDuplicationCheckField {...NICKNAME} />

      <InputGroup section={DISCHARGE_YEAR.section}>
        <InputGroup.Label label={DISCHARGE_YEAR.label} />
        <InputGroup.Input {...DISCHARGE_YEAR.input} />
      </InputGroup>

      <InputGroup section={MILITARY_BRANCH.section}>
        <InputGroup.Label label={MILITARY_BRANCH.label} />
        <InputGroup.SortOfArmy />
      </InputGroup>

      <StyledButton size="lg" onClick={handleNextStep} disabled={!isNicknameUnique}>
        다음으로
      </StyledButton>
    </>
  )
}

const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('auto', 0, '4xl')};
`
function useSignupTwoStepNext(): { handleNextStep: any } {
  throw new Error('Function not implemented.')
}
