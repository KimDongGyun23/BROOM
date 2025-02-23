import { AllCheckIcon, CheckIcon } from '@/shared/ui/icons/ActiveIcons'
import { AGREEMENTS, useCheckedAgreements, useIsAllChecked, useTermsActions } from '@/stores/terms'

import {
  AgreementItemContainer,
  AgreementList,
  AgreementToggleButton,
  AllAgreementButton,
  StyledButton,
  ViewButton,
} from './SignupStyle'

type AgreementItemProps = {
  text: string
  isChecked: boolean
  onToggle: VoidFunction
}

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
  const checkedAgreements = useCheckedAgreements()
  const isAllChecked = useIsAllChecked()
  const { toggleAgreement, toggleAllAgreements } = useTermsActions()

  return (
    <>
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

      <StyledButton size="lg" type="submit" disabled={!isAllChecked}>
        회원가입 완료
      </StyledButton>
    </>
  )
}
