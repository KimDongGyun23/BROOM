import { styled } from 'styled-components'

import {
  AGREEMENTS,
  useCheckedAgreements,
  useIsAllChecked,
} from '@/features/agree-term/model/terms.store'
import { AgreementItem } from '@/features/agree-term/ui/AgreementItem'
import { AllAgreementButton } from '@/features/agree-term/ui/AllAgreementButton'
import { Button } from '@/shared/ui/Button'

export const SignupThirdStep = () => {
  const checkedAgreements = useCheckedAgreements()
  const isAllChecked = useIsAllChecked()

  return (
    <>
      <AllAgreementButton />
      <AgreementList>
        {AGREEMENTS.map(({ id, text }) => (
          <AgreementItem key={id} id={id} text={text} isChecked={checkedAgreements.has(id)} />
        ))}
      </AgreementList>

      <StyledButton size="lg" type="submit" disabled={!isAllChecked}>
        회원가입 완료
      </StyledButton>
    </>
  )
}

const StyledButton = styled(Button)`
  ${({ theme }) => theme.margin('auto', 0, '4xl')};
`

const AgreementList = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
`
