import { useState } from 'react'

import { AllCheckIcon, CheckIcon } from '@/components/view/icons/ActiveIcons'

import {
  AgreementItemContainer,
  AgreementList,
  AgreementToggleButton,
  AllAgreementButton,
  FormContainer,
  StyledButton,
  ViewButton,
} from './SignupStyle'

const AGREEMENTS = [
  { id: 'personalConsent', text: '(필수) 개인정보 이용 약관 동의' },
  { id: 'serviceConsent', text: '(필수) 서비스 이용 약관 동의' },
] as const

type AgreementItemProps = {
  text: string
  isChecked: boolean
  onToggle: VoidFunction
}

type AgreementId = (typeof AGREEMENTS)[number]['id']

const AgreementItem = ({ text, isChecked, onToggle }: AgreementItemProps) => (
  <AgreementItemContainer>
    <AgreementToggleButton type="button" onClick={onToggle} $isChecked={isChecked}>
      <CheckIcon active={isChecked} />
      <p className="label">{text}</p>
    </AgreementToggleButton>
    <ViewButton type="button">보기</ViewButton>
  </AgreementItemContainer>
)

export const SignupThirdStep = () => {
  const [checkedAgreements, setCheckedAgreements] = useState<Set<AgreementId>>(new Set())
  const isAllChecked = checkedAgreements.size === AGREEMENTS.length

  const toggleAgreement = (id: AgreementId) => {
    setCheckedAgreements((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAllAgreements = () => {
    setCheckedAgreements((prev) =>
      prev.size === AGREEMENTS.length ? new Set() : new Set(AGREEMENTS.map((a) => a.id)),
    )
  }

  return (
    <>
      <FormContainer>
        <AllAgreementButton type="button" onClick={toggleAllAgreements} $isChecked={isAllChecked}>
          <AllCheckIcon active={isAllChecked} />
          <h4>모두 동의합니다.</h4>
        </AllAgreementButton>

        <AgreementList>
          {AGREEMENTS.map(({ id, text }) => (
            <AgreementItem
              key={id}
              text={text}
              isChecked={checkedAgreements.has(id)}
              onToggle={() => toggleAgreement(id)}
            />
          ))}
        </AgreementList>
      </FormContainer>

      <StyledButton size="lg" type="submit" disabled={!isAllChecked}>
        회원가입 완료
      </StyledButton>
    </>
  )
}
