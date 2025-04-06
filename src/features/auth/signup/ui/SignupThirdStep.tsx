import { styled } from 'styled-components'

import { Button } from '@/shared/ui/Button'

import { AGREEMENTS, useCheckedAgreements, useIsAllChecked } from '../model/terms.store'

import { AgreementItem } from './AgreementItem'
import { AllAgreementButton } from './AllAgreementButton'

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

      <CompleteButton size="lg" type="submit" disabled={!isAllChecked}>
        회원가입 완료
      </CompleteButton>
    </>
  )
}

const CompleteButton = styled(Button)`
  ${({ theme }) => theme.margin('auto', 0, '4xl')};
`

const AgreementList = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, undefined, 'xl')};
`
